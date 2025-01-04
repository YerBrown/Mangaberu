import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";
import { useModal } from "../../context/ModalContext";
import { useAuth } from "../../context/AuthContext";
import { useLazyQuery } from "@apollo/client";
import { GET_MEDIA_TRENDING } from "../../graphql/queries";
import { toggleFavourite } from "../../services/anilistService";
import DOMPurify from "dompurify";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import HeartBrokenRoundedIcon from "@mui/icons-material/HeartBrokenRounded";
import SentimentSatisfiedOutlinedIcon from "@mui/icons-material/SentimentSatisfiedOutlined";
import SentimentNeutralOutlinedIcon from "@mui/icons-material/SentimentNeutralOutlined";
import SentimentDissatisfiedOutlinedIcon from "@mui/icons-material/SentimentDissatisfiedOutlined";
import PlayCircleRoundedIcon from "@mui/icons-material/PlayCircleRounded";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import "./TrendingSection.css";

let sanitizedDescriptionHTML = "";
let averageScore = "";
let currentBannerImage = "";

function getCurrentSeasonAndYear() {
    const date = new Date();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    let season;
    if (month >= 1 && month <= 3) {
        season = "WINTER";
    } else if (month >= 4 && month <= 6) {
        season = "SPRING";
    } else if (month >= 7 && month <= 9) {
        season = "SUMMER";
    } else {
        season = "FALL";
    }

    return { season, seasonYear: year };
}

function TrendingSection() {
    const { theme } = useTheme();
    const { openModal } = useModal();
    const {
        fetchUserMediaLists,
        fetchAnimeLists,
        fetchMangaLists,
        fetchFavouritesLists,
        userData,
    } = useAuth();
    const [trendingAnime, setTrendingAnime] = useState([]);
    const [currentTrendingIndex, setCurrentTrendingIndex] = useState(0);
    const [isWatchTrailer, setIsWatchTrailer] = useState(false);
    const { season, seasonYear } = getCurrentSeasonAndYear();

    const [fetchAnime, { data, loading, error, refetch }] = useLazyQuery(
        GET_MEDIA_TRENDING,
        {
            variables: {
                type: "ANIME",
                sort: "POPULARITY_DESC",
                page: 1,
                perPage: 5,
                season,
                seasonYear,
            },
        }
    );

    const navigate = useNavigate();
    useEffect(() => {
        fetchAnime();
    }, []);

    const handleToggleFavourite = async (media) => {
        try {
            await toggleFavourite(media.id, media.type);
            await refetch();
            fetchFavouritesLists();
        } catch (error) {
            console.error("Error toggling favourite:", error);
        }
    };
    const handleTrendingChange = (index) => {
        setCurrentTrendingIndex(index);
    };
    const handleWatchTrailer = (disable) => {
        setIsWatchTrailer(disable);
    };
    const handleNavigate = (route) => {
        navigate(route);
    };

    if (data) {
        sanitizedDescriptionHTML = DOMPurify.sanitize(
            data.Page.media[currentTrendingIndex].description
        );
        averageScore = data.Page.media[currentTrendingIndex].averageScore;
        currentBannerImage =
            data.Page.media[currentTrendingIndex].bannerImage ||
            data.Page.media[currentTrendingIndex].coverImage.extraLarge;
    }
    const renderFace = () => {
        if (averageScore <= 33) {
            return (
                <SentimentDissatisfiedOutlinedIcon style={{ color: "red" }} />
            );
        } else if (averageScore <= 66) {
            return <SentimentNeutralOutlinedIcon style={{ color: "orange" }} />;
        } else {
            return (
                <SentimentSatisfiedOutlinedIcon style={{ color: "green" }} />
            );
        }
    };

    return (
        <section id="trending-section">
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error.message}</p>
            ) : data ? (
                <>
                    <img
                        src={currentBannerImage}
                        alt="banner-image"
                        className="banner"
                    />
                    <div
                        className={
                            theme == "light"
                                ? "banner-filter light"
                                : "banner-filter dark"
                        }
                    ></div>
                    <iframe
                        src={`https://www.youtube.com/embed/${data.Page.media[currentTrendingIndex].trailer.id}`}
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className={isWatchTrailer ? "active" : ""}
                    ></iframe>
                    <div
                        className={`current-anime ${
                            isWatchTrailer ? "disable" : ""
                        }`}
                    >
                        <div className="current-anime-buttons">
                            <img
                                src={
                                    data.Page.media[currentTrendingIndex]
                                        .coverImage.extraLarge
                                }
                                alt="current-anime-cover"
                            />
                            <div className="buttons-container">
                                <button
                                    onClick={() =>
                                        openModal(
                                            data.Page.media[
                                                currentTrendingIndex
                                            ].mediaListEntry,
                                            data.Page.media[
                                                currentTrendingIndex
                                            ],
                                            refetch
                                        )
                                    }
                                >
                                    {data.Page.media[currentTrendingIndex]
                                        .mediaListEntry
                                        ? "Edit List Entry"
                                        : "Add To List"}
                                </button>
                                <button
                                    onClick={() =>
                                        handleToggleFavourite(
                                            data.Page.media[
                                                currentTrendingIndex
                                            ]
                                        )
                                    }
                                >
                                    {data.Page.media[currentTrendingIndex]
                                        .isFavourite ? (
                                        <HeartBrokenRoundedIcon />
                                    ) : (
                                        <FavoriteOutlinedIcon />
                                    )}
                                </button>
                            </div>
                        </div>

                        <div className="current-anime-data">
                            <div className="anime-data">
                                <h2>
                                    {
                                        data.Page.media[currentTrendingIndex]
                                            .title.english
                                    }
                                </h2>
                                <div className="year-genres">
                                    <h4>
                                        {
                                            data.Page.media[
                                                currentTrendingIndex
                                            ].startDate.year
                                        }
                                    </h4>
                                    <p>
                                        {data.Page.media[
                                            currentTrendingIndex
                                        ].genres.join(", ")}
                                    </p>
                                </div>
                                {data.Page.media[currentTrendingIndex]
                                    .averageScore && (
                                    <p>
                                        {"Average Score: "}
                                        {
                                            data.Page.media[
                                                currentTrendingIndex
                                            ].averageScore
                                        }
                                        {" % "}
                                        {renderFace()}
                                    </p>
                                )}
                                {data.Page.media[currentTrendingIndex]
                                    .episodes !== null && (
                                    <p className="episodes">
                                        Episodes:{" "}
                                        {
                                            data.Page.media[
                                                currentTrendingIndex
                                            ].episodes
                                        }
                                    </p>
                                )}
                                <p
                                    className="description"
                                    dangerouslySetInnerHTML={{
                                        __html: sanitizedDescriptionHTML,
                                    }}
                                ></p>
                            </div>
                            <div className="buttons-container">
                                <button
                                    onClick={() => handleWatchTrailer(true)}
                                >
                                    {"Watch Trailer"}
                                    {<PlayCircleRoundedIcon />}
                                </button>
                                <button
                                    onClick={() =>
                                        handleNavigate(
                                            `/anime/${data.Page.media[currentTrendingIndex].id}`
                                        )
                                    }
                                >
                                    {"More Info"}
                                    {<InfoRoundedIcon />}
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={`top-5 ${isWatchTrailer ? "disable" : ""}`}>
                        <h3>POPULAR THIS SEASON</h3>
                        <div className="anime-items-container">
                            {data.Page.media.map((mediaItem, index) => (
                                <div
                                    key={mediaItem.id}
                                    className={`trending-anime-item ${
                                        currentTrendingIndex === index
                                            ? "active"
                                            : ""
                                    }`}
                                    onClick={() => handleTrendingChange(index)}
                                >
                                    <img
                                        src={
                                            mediaItem.bannerImage ||
                                            mediaItem.coverImage.medium
                                        }
                                        alt={
                                            mediaItem.title.english ||
                                            mediaItem.title.romaji
                                        }
                                    />
                                    <div className="filter" />
                                    <h3>
                                        {mediaItem.title.english ||
                                            mediaItem.title.romaji}
                                    </h3>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            ) : null}
        </section>
    );
}

export default TrendingSection;
