import React, { useState, useEffect } from "react";
import { useModal } from "../context/ModalContext";
import { useAuth } from "../context/AuthContext";
import "./EditListModal.css";

import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import HeartBrokenRoundedIcon from "@mui/icons-material/HeartBrokenRounded";
function EditListModal() {
    const { isOpen, modalData, closeModal } = useModal();
    const { fetchUserMediaLists, userData } = useAuth();
    const [editedData, setEditedData] = useState(modalData || {});
    const [isSaving, setIsSaving] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    useEffect(() => {
        if (modalData) {
            setEditedData(modalData);
        }
    }, [modalData, isOpen]);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const hasChanges = JSON.stringify(modalData) !== JSON.stringify(editedData);
    const handleSave = async () => {
        if (!hasChanges) {
            console.log("No changes to save.");
            closeModal();
            return;
        }
        setIsSaving(true);
        const mutation = `
        mutation ($mediaId: Int, $progress: Int, $score: Float, $status: MediaListStatus, $startedAt: FuzzyDateInput, $completedAt: FuzzyDateInput) {
            SaveMediaListEntry(mediaId: $mediaId, progress: $progress, score: $score, status: $status, startedAt: $startedAt, completedAt: $completedAt) {
                id
                progress
                score
                status
                startedAt {
                    year
                    month
                    day
                    }
                    completedAt {
                        year
                        month
                        day
                        }
                        }
                        }
                        `;

        const variables = {
            mediaId: modalData.media.id,
            progress: parseInt(editedData.progress, 10) || 0,
            score: parseFloat(editedData.score) || 0,
            status: editedData.status || "CURRENT",
            startedAt: editedData.startedAt
                ? {
                      year: editedData.startedAt.year,
                      month: editedData.startedAt.month,
                      day: editedData.startedAt.day,
                  }
                : null,
            completedAt: editedData.completedAt
                ? {
                      year: editedData.completedAt.year,
                      month: editedData.completedAt.month,
                      day: editedData.completedAt.day,
                  }
                : null,
        };

        const token = localStorage.getItem("access_token");

        const response = await fetch("https://graphql.anilist.co", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ query: mutation, variables }),
        });

        const data = await response.json();

        if (data.errors) {
            console.error("Error updating:", data.errors);
        } else {
            console.log("Updated successfully:", data);
            fetchUserMediaLists(userData.id);
            closeModal();
        }
        setIsSaving(false);
    };

    const handleDelete = async () => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this entry?"
        );
        if (!confirmDelete) return;
        setIsDeleting(true);
        const mutation = `
            mutation ($id: Int) {
                DeleteMediaListEntry(id: $id) {
                    deleted
                }
            }
        `;

        const variables = {
            id: modalData.id,
        };

        const token = localStorage.getItem("access_token");

        const response = await fetch("https://graphql.anilist.co", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ query: mutation, variables }),
        });

        const data = await response.json();

        if (data.errors) {
            console.error("Error deleting:", data.errors);
        } else {
            console.log("Entry deleted successfully:", data);
            fetchUserMediaLists(userData.id);
            closeModal();
        }
        setIsDeleting(false);
    };

    useEffect(() => {
        if (isOpen) {
            // Desactivar scroll cuando el modal está abierto
            document.body.style.overflow = "hidden";
        } else {
            // Reactivar scroll cuando se cierra el modal
            document.body.style.overflow = "auto";
        }

        // Limpiar el efecto al desmontar el modal
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isOpen]);

    if (!isOpen || !modalData) return null;
    return (
        <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="close-btn" onClick={closeModal}>
                    <CloseRoundedIcon />
                </button>
                <img
                    src={modalData.media.bannerImage}
                    alt={modalData.media.title.english}
                    className="banner"
                />
                <div className="modal-data">
                    <div className="top-part">
                        <img
                            src={modalData.media.coverImage.large}
                            alt={modalData.media.title.english}
                        />
                        <h3>
                            {modalData.media.title.english ||
                                modalData.media.title.romaji}
                        </h3>
                        <button
                            onClick={handleSave}
                            disabled={isSaving || isDeleting}
                        >
                            {isSaving ? "Saving..." : "Save"}
                        </button>
                    </div>
                    <form action="" className="bottom-part">
                        <div className="status">
                            <label htmlFor="media-status">Score:</label>
                            <select
                                name="status"
                                id="media-status"
                                onChange={handleChange}
                                value={editedData.status}
                            >
                                <option value="CURRENT">
                                    {modalData.media.type === "ANIME"
                                        ? "Watching"
                                        : "Reading"}
                                </option>
                                <option value="PLANNING">Planning</option>
                                <option value="COMPLETED">Completed</option>
                                <option value="DROPPED">Dropped</option>
                                <option value="PAUSED">Paused</option>
                            </select>
                        </div>
                        <div className="score">
                            <label htmlFor="score">Score:</label>
                            <input
                                type="number"
                                name="score"
                                id="score"
                                min={0}
                                max={100}
                                value={editedData.score}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="progress">
                            <label htmlFor="progress">
                                {modalData.media.type === "ANIME"
                                    ? "Episode Progress:"
                                    : "Chapter Progress:"}
                            </label>
                            <input
                                type="number"
                                name="progress"
                                id="progress"
                                min={0}
                                max={
                                    modalData.media.episodes ||
                                    modalData.media.chapters ||
                                    null
                                }
                                value={editedData.progress}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="start-date">
                            <label htmlFor="start-date">Start Date:</label>
                            <input
                                type="date"
                                name="start-date"
                                id="start-date"
                                value={
                                    editedData.startedAt
                                        ? `${
                                              editedData.startedAt.year
                                          }-${String(
                                              editedData.startedAt.month
                                          ).padStart(2, "0")}-${String(
                                              editedData.startedAt.day
                                          ).padStart(2, "0")}`
                                        : ""
                                }
                                onChange={handleChange}
                            />
                        </div>
                        <div className="finish-date">
                            <label htmlFor="finish-date">Finish Date:</label>
                            <input
                                type="date"
                                name="finish-date"
                                id="finish-date"
                                value={
                                    editedData.completedAt
                                        ? `${
                                              editedData.completedAt.year
                                          }-${String(
                                              editedData.completedAt.month
                                          ).padStart(2, "0")}-${String(
                                              editedData.completedAt.day
                                          ).padStart(2, "0")}`
                                        : ""
                                }
                                onChange={handleChange}
                            />
                        </div>
                        <div className="delete">
                            <button
                                onClick={handleDelete}
                                disabled={isDeleting || isSaving}
                            >
                                {isDeleting ? "Deleting..." : "Delete"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditListModal;
