import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import DOMPurify from "dompurify";
import { GET_MEDIA_BY_ID } from "../graphql/queries";
import Navbar from "../components/Navbar";
import { useModal } from "../context/ModalContext";
import { toggleFavourite } from "../services/anilistService";
import RemoveRedEyeRoundedIcon from "@mui/icons-material/RemoveRedEyeRounded";
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";
import LinkRoundedIcon from "@mui/icons-material/LinkRounded";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import HeartBrokenRoundedIcon from "@mui/icons-material/HeartBrokenRounded";
import EditNoteRoundedIcon from "@mui/icons-material/EditNoteRounded";
import PlaylistAddRoundedIcon from "@mui/icons-material/PlaylistAddRounded";
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
    const { id_manga } = useParams();
    const { openModal } = useModal();
    const { data, loading, error, refetch } = useQuery(GET_MEDIA_BY_ID, {
        variables: {
            mediaId: id_manga,
        },
    });
    const navigate = useNavigate();
    const handleNavigate = (mediaId) => {
        navigate("/manga/" + mediaId);
    };
    const handleOpenLink = (url) => {
        window.open(url, "_blank");
    };
    const handleToggleFavourite = async (media) => {
        try {
            await toggleFavourite(media.id, media.type);
            await refetch();
            fetchFavouritesLists();
        } catch (error) {
            console.error("Error toggling favourite:", error);
        }
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
                    {data.Media.bannerImage && (
                        <img
                            src={data.Media.bannerImage}
                            alt={data.Media.title.romaji}
                            className="banner"
                        />
                    )}
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
                                    src={data.Media.coverImage.extraLarge}
                                    alt={data.Media.title.romaji}
                                />
                                <button
                                    onClick={() =>
                                        openModal(
                                            data.Media.mediaListEntry,
                                            data.Media,
                                            refetch
                                        )
                                    }
                                >
                                    {data.Media.mediaListEntry ? (
                                        <>
                                            <EditNoteRoundedIcon fontSize="small" />
                                            Edit List
                                        </>
                                    ) : (
                                        <>
                                            <PlaylistAddRoundedIcon fontSize="small" />
                                            Add To List
                                        </>
                                    )}
                                </button>
                                <button
                                    onClick={() =>
                                        handleToggleFavourite(data.Media)
                                    }
                                >
                                    {data.Media.isFavourite ? (
                                        <>
                                            <FavoriteOutlinedIcon fontSize="small" />
                                            Remove Favourite
                                        </>
                                    ) : (
                                        <>
                                            <FavoriteBorderRoundedIcon fontSize="small" />
                                            Add To Favourites
                                        </>
                                    )}
                                </button>
                                {data.Media.externalLinks.map(
                                    (exterlanLink) =>
                                        exterlanLink.type === "STREAMING" && (
                                            <button
                                                key={exterlanLink.id}
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
                                                    {exterlanLink.icon ? (
                                                        <img
                                                            src={
                                                                exterlanLink.icon
                                                            }
                                                            alt={
                                                                exterlanLink.site +
                                                                " icon"
                                                            }
                                                        />
                                                    ) : (
                                                        <LinkRoundedIcon />
                                                    )}
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
                                                Status:{" "}
                                                {capitalizeString(
                                                    data.Media.status
                                                )}
                                            </p>
                                        </div>
                                        <div className="content">
                                            <h4>Details</h4>
                                            <p>
                                                Chapters:{" "}
                                                {data.Media.chapters || "N/A"}
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
                                            {data.Media.staff.edges.length >
                                                0 && (
                                                <p>
                                                    Creator:{" "}
                                                    {
                                                        data.Media.staff
                                                            .edges[0].node.name
                                                            .full
                                                    }
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
                                {data.Page.recommendations.length > 0 && (
                                    <div className="recomendations">
                                        <h4>Recommendations</h4>
                                        <div className="recomendations-container">
                                            {data.Page.recommendations.map(
                                                (recomendation) =>
                                                    recomendation.mediaRecommendation && (
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
