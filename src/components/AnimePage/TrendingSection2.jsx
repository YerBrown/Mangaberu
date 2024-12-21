import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useTheme } from "../../context/ThemeContext";
import { GET_ANIME_TRENDING } from "../../graphql/queries";
import DOMPurify from "dompurify";
import "./TrendingSection2.css";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import SentimentSatisfiedOutlinedIcon from "@mui/icons-material/SentimentSatisfiedOutlined";
import SentimentNeutralOutlinedIcon from "@mui/icons-material/SentimentNeutralOutlined";
import SentimentDissatisfiedOutlinedIcon from "@mui/icons-material/SentimentDissatisfiedOutlined";
import PlayCircleRoundedIcon from "@mui/icons-material/PlayCircleRounded";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
function getCurrentSeasonAndYear() {
    const date = new Date();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    let season;
    if (month >= 1 && month <= 3) {
        season = "WINTER"; // Enero, Febrero, Marzo
    } else if (month >= 4 && month <= 6) {
        season = "SPRING"; // Abril, Mayo, Junio
    } else if (month >= 7 && month <= 9) {
        season = "SUMMER"; // Julio, Agosto, Septiembre
    } else {
        season = "FALL"; // Octubre, Noviembre, Diciembre
    }

    return { season, seasonYear: year };
}
function TrendingSection2() {
    const { season, seasonYear } = getCurrentSeasonAndYear();
    const { theme } = useTheme();
    const [currentTrendingIndex, setCurrentTrendingIndex] = useState(0);
    const [isWatchTrailer, setIsWatchTrailer] = useState(false);
    const { data, loading, error } = useQuery(GET_ANIME_TRENDING, {
        variables: {
            type: "ANIME",
            sort: "POPULARITY_DESC",
            page: 1,
            perPage: 5,
            season: season,
            seasonYear: seasonYear,
        },
    });

    const handleTrendingChange = (index) => {
        setCurrentTrendingIndex(index);
    };
    const handleWatchTrailer = (disable) => {
        setIsWatchTrailer(disable);
    };

    if (loading)
        return (
            <section id="trending-section">
                <p>Loading...</p>
            </section>
        );
    if (error)
        return (
            <section id="trending-section">
                <p>Error: {error.message}</p>;
            </section>
        );
    const sanitizedHTML = DOMPurify.sanitize(
        data.Page.media[currentTrendingIndex].description
    );
    const averageScore = data.Page.media[currentTrendingIndex].averageScore;
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
    const currentBannerImage =
        data.Page.media[currentTrendingIndex].bannerImage ||
        data.Page.media[currentTrendingIndex].coverImage.extraLarge;
    return (
        <section id="trending-section">
            <img
                src={currentBannerImage}
                alt="banner-image"
                className="banner"
            />
            <iframe
                src={`https://www.youtube.com/embed/${data.Page.media[currentTrendingIndex].trailer.id}`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className={isWatchTrailer ? "active" : ""}
            ></iframe>
            <div
                className={
                    theme == "light"
                        ? "banner-filter light"
                        : "banner-filter dark"
                }
            ></div>
            <div className={`current-anime ${isWatchTrailer ? "disable" : ""}`}>
                <div className="current-anime-data">
                    <h2>
                        {data.Page.media[currentTrendingIndex].title.english}
                    </h2>
                    <div className="year-genres">
                        <h4>
                            {
                                data.Page.media[currentTrendingIndex].startDate
                                    .year
                            }
                        </h4>
                        <p>
                            {data.Page.media[currentTrendingIndex].genres.join(
                                ", "
                            )}
                        </p>
                    </div>
                    <p
                        dangerouslySetInnerHTML={{
                            __html: sanitizedHTML,
                        }}
                    ></p>
                    <div className="buttons-container">
                        <button onClick={() => handleWatchTrailer(true)}>
                            {"Watch Trailer "}
                            {<PlayCircleRoundedIcon />}
                        </button>
                        <button>
                            {"More Info "}
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
                                currentTrendingIndex === index ? "active" : ""
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
        </section>
    );
}

export default TrendingSection2;
