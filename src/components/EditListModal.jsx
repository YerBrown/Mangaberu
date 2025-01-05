import React, { useState, useEffect } from "react";
import { useModal } from "../context/ModalContext";
import { useAuth } from "../context/AuthContext";
import { toggleFavourite } from "../services/anilistService";
import "./EditListModal.css";

import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import HeartBrokenRoundedIcon from "@mui/icons-material/HeartBrokenRounded";
import SaveAsRoundedIcon from "@mui/icons-material/SaveAsRounded";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
function EditListModal() {
    const { isOpen, modalData, closeModal } = useModal();
    const { refetchLists, userData } = useAuth();
    const [editedData, setEditedData] = useState(modalData || null);
    const [isSaving, setIsSaving] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "startedAt" || name === "completedAt") {
            const [year, month, day] = value.split("-"); // Divide el valor yyyy-mm-dd
            setEditedData((prev) => ({
                ...prev,
                data: {
                    ...prev.data,
                    [name]: {
                        year: parseInt(year, 10),
                        month: parseInt(month, 10),
                        day: parseInt(day, 10),
                    },
                },
            }));
        } else {
            setEditedData((prev) => ({
                ...prev,
                data: {
                    ...prev.data,
                    [name]: value,
                },
            }));
        }
    };
    const handleToggleFavourite = async () => {
        try {
            await toggleFavourite(
                editedData.mediaData.id,
                editedData.mediaData.type
            );

            setEditedData((prev) => ({
                ...prev,
                mediaData: {
                    ...prev.mediaData,
                    isFavourite: !prev.mediaData.isFavourite,
                },
            }));
            refetchLists();
            if (modalData.onSave) {
                modalData.onSave();
            }
        } catch (error) {
            console.error("Error toggling favourite:", error);
        }
    };

    const hasChanges = JSON.stringify(modalData) !== JSON.stringify(editedData);
    const handleSave = async () => {
        // if (!hasChanges) {
        //     console.log("No changes to save.");
        //     closeModal();
        //     return;
        // }
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
            mediaId: modalData.mediaData.id,
            status: editedData.data.status,
            progress: parseInt(editedData.data.progress, 10) || 0,
            score: parseFloat(editedData.data.score) || 0,
            startedAt: editedData.data.startedAt
                ? {
                      year: editedData.data.startedAt.year,
                      month: editedData.data.startedAt.month,
                      day: editedData.data.startedAt.day,
                  }
                : null,
            completedAt: editedData.data.completedAt
                ? {
                      year: editedData.data.completedAt.year,
                      month: editedData.data.completedAt.month,
                      day: editedData.data.completedAt.day,
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
            refetchLists();
            if (modalData.onSave) {
                modalData.onSave();
            }
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
            id: modalData.data.id,
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
            refetchLists();
            if (modalData.onSave) {
                modalData.onSave();
            }
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
    useEffect(() => {
        if (modalData) {
            setEditedData(modalData);
        }
    }, [isOpen]);
    if (!isOpen || !modalData || !editedData) return null;
    return (
        <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="close-btn" onClick={closeModal}>
                    <CloseRoundedIcon />
                </button>
                <img
                    src={modalData.mediaData.bannerImage}
                    alt={modalData.mediaData.title.english}
                    className="banner"
                />
                <div className="modal-data">
                    <div className="top-part">
                        <img
                            src={modalData.mediaData.coverImage.large}
                            alt={modalData.mediaData.title.english}
                        />
                        <h3>
                            {modalData.mediaData.title.english ||
                                modalData.mediaData.title.romaji}
                        </h3>
                        <div className="buttons-container">
                            {editedData?.mediaData ? (
                                <button
                                    onClick={handleToggleFavourite}
                                    disabled={isSaving || isDeleting}
                                >
                                    {editedData.mediaData.isFavourite ? (
                                        <HeartBrokenRoundedIcon fontSize="small" />
                                    ) : (
                                        <FavoriteRoundedIcon fontSize="small" />
                                    )}
                                </button>
                            ) : null}
                            <button
                                className="save"
                                onClick={handleSave}
                                disabled={isSaving || isDeleting}
                            >
                                <SaveAsRoundedIcon fontSize="small" />
                                {isSaving ? "Saving..." : "Save"}
                            </button>
                        </div>
                    </div>
                    <form action="" className="bottom-part">
                        <div className="status">
                            <label htmlFor="media-status">Status:</label>
                            <select
                                name="status"
                                id="media-status"
                                onChange={handleChange}
                                value={editedData.data.status || "CURRENT"}
                            >
                                <option value="CURRENT">
                                    {modalData.mediaData.type === "ANIME"
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
                                value={editedData.data.score || 0}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="progress">
                            <label htmlFor="progress">
                                {modalData.mediaData.type === "ANIME"
                                    ? "Episode Progress:"
                                    : "Chapter Progress:"}
                            </label>
                            <input
                                type="number"
                                name="progress"
                                id="progress"
                                min={0}
                                max={
                                    modalData.mediaData.episodes ||
                                    modalData.mediaData.chapters ||
                                    null
                                }
                                value={editedData.data.progress || 0}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="start-date">
                            <label htmlFor="start-date">Start Date:</label>
                            <input
                                type="date"
                                name="startedAt"
                                id="start-date"
                                value={
                                    editedData.data.startedAt
                                        ? `${
                                              editedData.data.startedAt.year
                                          }-${String(
                                              editedData.data.startedAt.month
                                          ).padStart(2, "0")}-${String(
                                              editedData.data.startedAt.day
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
                                name="completedAt"
                                id="finish-date"
                                value={
                                    editedData.data.completedAt
                                        ? `${
                                              editedData.data.completedAt.year
                                          }-${String(
                                              editedData.data.completedAt.month
                                          ).padStart(2, "0")}-${String(
                                              editedData.data.completedAt.day
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
                                <DeleteForeverRoundedIcon fontSize="small" />
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
