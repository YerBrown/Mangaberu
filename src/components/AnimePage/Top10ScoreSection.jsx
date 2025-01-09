import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DOMPurify from "dompurify";
import { useLazyQuery } from "@apollo/client";
import "./Top10ScoreSection.css";
import { GET_TOP_50_MEDIA } from "../../graphql/queries";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import StarRounded from "@mui/icons-material/StarRounded";
import EmojiEventsRoundedIcon from "@mui/icons-material/EmojiEventsRounded";

// Componente para cada tarjeta de anime
function AnimeCard({ anime, index, isActive, onClick, onNavigate }) {
    return (
        <div
            className={`anime-card ${isActive ? "active" : ""}`}
            onClick={onClick}
        >
            <img
                src={anime.bannerImage}
                alt={`${anime.title.english} banner`}
                className="banner"
            />
            <div className="anime-data">
                <h4>{index + 1}</h4>
                <p className="score">
                    <StarRounded /> {anime.averageScore} %
                </p>
                <div className="content">
                    <h3>{anime.title.english}</h3>
                    <div className="year-genres">
                        <h4>{anime.startDate.year}</h4>
                        <p>{anime.genres.join(", ")}</p>
                    </div>
                    <p
                        className="description"
                        dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(anime.description),
                        }}
                    ></p>
                    <button onClick={() => onNavigate(anime.id)}>
                        More Info <InfoRoundedIcon fontSize="small" />
                    </button>
                </div>
            </div>
        </div>
    );
}

// Componente principal
function Top10Score() {
    const [currentTopIndex, setCurrentTopIndex] = useState(0);
    const [fetchTop50, { data, loading, error }] = useLazyQuery(
        GET_TOP_50_MEDIA,
        {
            variables: { type: "ANIME" },
        }
    );
    const navigate = useNavigate();

    useEffect(() => {
        if (!data) {
            fetchTop50();
        }
    }, [data, fetchTop50]);

    const handleSelectAnimeDirectly = (index) => {
        setCurrentTopIndex(index);
    };

    const handleNavigate = (animeId) => {
        navigate(`/anime/${animeId}`);
    };

    return (
        <section id="top-10-score-section">
            <h2>
                <EmojiEventsRoundedIcon fontSize="large" />
                Top 50 All Time
            </h2>
            <div className="top-10-container">
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>{error.message}</p>
                ) : data ? (
                    data.Page.media.map((anime, index) => (
                        <AnimeCard
                            key={anime.id}
                            anime={anime}
                            index={index}
                            isActive={index === currentTopIndex}
                            onClick={() => handleSelectAnimeDirectly(index)}
                            onNavigate={handleNavigate}
                        />
                    ))
                ) : (
                    <p>No data available</p>
                )}
            </div>
        </section>
    );
}

export default Top10Score;
