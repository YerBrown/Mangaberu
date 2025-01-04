import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import DOMPurify from "dompurify";
import { GET_MEDIA_BY_ID } from "../graphql/queries";
import Navbar from "../components/Navbar";

import RemoveRedEyeRoundedIcon from "@mui/icons-material/RemoveRedEyeRounded";
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";

import "./AnimeDetails.css";

function getHourMinFormat(mins) {
    const hours = Math.floor(mins / 60);
    const minutesRes = mins % 60;
    return hours > 0 ? `${hours}h ${minutesRes}min` : `${minutesRes}min`;
}
function capitalizeString(text) {
    if (!text) return "";
    const textLowercase = text.toLowerCase();
    return textLowercase.charAt(0).toUpperCase() + textLowercase.slice(1);
}
function formatDate(dateFormat) {
    const { year, month, day } = dateFormat;
    const date = new Date(year, month - 1, day);
    const options = { month: "short" };
    const monthName = date.toLocaleString("en-US", options);

    return `${monthName} ${day}, ${year}`;
}

function AnimeDetails() {
    const { userData, isLoading } = useAuth();
    const { id_anime } = useParams();
    const { data, loading, error } = useQuery(GET_MEDIA_BY_ID, {
        variables: {
            mediaId: id_anime,
        },
    });
    const navigate = useNavigate();
    const handleNavigate = (mediaId) => {
        navigate("/anime/" + mediaId);
    };
    const handleOpenLink = (url) => {
        window.open(url, "_blank");
    };
    if (loading)
        return (
            <div id="anime-details-menu">
                <p>Loading...</p>
            </div>
        );
    if (error)
        return (
            <div id="anime-details-menu">
                <p>Error: {error.message}</p>;
            </div>
        );

    const sanitizedDescriptionHTML = DOMPurify.sanitize(data.Media.description);
    return (
        <>
            <header>
                {userData ? (
                    <Navbar userAvatar={userData.avatar.medium} />
                ) : (
                    <Navbar />
                )}
            </header>
            <main>
                <div id="anime-details-menu">
                    <img
                        src={data.Media.bannerImage}
                        alt={data.Media.title.romaji}
                        className="banner"
                    />
                    <div className="img-filter"></div>
                    <section className="main-container">
                        <div className="top-part">
                            <h1>
                                {(data.Media.title.romaji ||
                                    data.Media.title.english) +
                                    ` (${data.Media.startDate.year})`}
                            </h1>
                        </div>
                        <div className="main-content">
                            <div className="cover-container">
                                <img
                                    src={data.Media.coverImage.large}
                                    alt={data.Media.title.romaji}
                                />
                                <button>Add To List</button>
                                <button>Set Favourite</button>
                                {data.Media.externalLinks.map(
                                    (exterlanLink) =>
                                        exterlanLink.type === "STREAMING" && (
                                            <button
                                                onClick={() =>
                                                    handleOpenLink(
                                                        exterlanLink.url
                                                    )
                                                }
                                            >
                                                <div
                                                    style={{
                                                        backgroundColor:
                                                            exterlanLink.color,
                                                    }}
                                                    className="icon"
                                                >
                                                    <img
                                                        src={exterlanLink.icon}
                                                        alt={
                                                            exterlanLink.site +
                                                            " icon"
                                                        }
                                                    />
                                                </div>
                                                <p>{exterlanLink.site}</p>
                                            </button>
                                        )
                                )}
                            </div>
                            <div className="main-data">
                                <div className="details-trailer">
                                    <div className="details">
                                        <div className="top-part">
                                            <p>
                                                <RemoveRedEyeRoundedIcon fontSize="small" />
                                                {data.Media.popularity}
                                            </p>
                                            {data.Media.averageScore && (
                                                <p>
                                                    <StarRateRoundedIcon fontSize="small" />
                                                    {data.Media.averageScore +
                                                        " %"}
                                                </p>
                                            )}
                                            <p>
                                                <AccessTimeRoundedIcon fontSize="small" />
                                                {getHourMinFormat(
                                                    data.Media.duration
                                                )}
                                            </p>
                                            <p>
                                                Status:{" "}
                                                {capitalizeString(
                                                    data.Media.status
                                                )}
                                            </p>
                                        </div>
                                        <div className="content">
                                            <h4>Details</h4>
                                            <p>
                                                Episodes:{" "}
                                                {data.Media.episodes || "N/A"}
                                            </p>
                                            <p>
                                                Format:{" "}
                                                {data.Media.format || "N/A"}
                                            </p>
                                            <p className="genres">
                                                Genres:{" "}
                                                {data.Media.genres.join(", ")}
                                            </p>
                                            <p>
                                                Studio:{" "}
                                                {data.Media.studios.nodes[0]
                                                    .name || "N/A"}
                                            </p>
                                            <p>
                                                Start Date:{" "}
                                                {data.Media.startDate
                                                    ? formatDate(
                                                          data.Media.startDate
                                                      )
                                                    : "N/A"}
                                            </p>
                                            {data.Media.endDate.year && (
                                                <p>
                                                    End Date:{" "}
                                                    {formatDate(
                                                        data.Media.endDate
                                                    ) || "N/A"}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    {data.Media.trailer && (
                                        <iframe
                                            src={`https://www.youtube.com/embed/${data.Media.trailer.id}`}
                                            title="YouTube video player"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                            className="trailer"
                                        ></iframe>
                                    )}
                                </div>
                                <div className="characters-container">
                                    {data.Media.characters.nodes.map(
                                        (character) => (
                                            <div key={character.name.full}>
                                                <img
                                                    src={character.image.large}
                                                    alt=""
                                                />
                                                <p>{character.name.full}</p>
                                            </div>
                                        )
                                    )}
                                </div>
                                <div className="description">
                                    <p
                                        dangerouslySetInnerHTML={{
                                            __html: sanitizedDescriptionHTML,
                                        }}
                                    ></p>
                                </div>
                                {data.Page.recommendations.lenght > 0 && (
                                    <div className="recomendations">
                                        <h4>Recommendations</h4>
                                        <div className="recomendations-container">
                                            {data.Page.recommendations.map(
                                                (recomendation) => (
                                                    <button
                                                        key={
                                                            recomendation
                                                                .mediaRecommendation
                                                                .id
                                                        }
                                                        onClick={() =>
                                                            handleNavigate(
                                                                recomendation
                                                                    .mediaRecommendation
                                                                    .id
                                                            )
                                                        }
                                                        className="recomendation-card"
                                                    >
                                                        <img
                                                            src={
                                                                recomendation
                                                                    .mediaRecommendation
                                                                    .coverImage
                                                                    .extraLarge
                                                            }
                                                            alt={
                                                                recomendation
                                                                    .mediaRecommendation
                                                                    .title
                                                                    .english
                                                            }
                                                        />
                                                        <h3>
                                                            {recomendation
                                                                .mediaRecommendation
                                                                .title
                                                                .english ||
                                                                recomendation
                                                                    .mediaRecommendation
                                                                    .title
                                                                    .romaji}
                                                        </h3>
                                                    </button>
                                                )
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </>
    );
}

export default AnimeDetails;
