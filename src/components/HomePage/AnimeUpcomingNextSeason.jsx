import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_ANIME_UPCOMING_SEASON } from "../../graphql/queries";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import ArrowForwardNewRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import "./AnimeUpcomingNextSeason.css";
function reorderArrayByIndex(array, index) {
    return [
        ...array.slice(index), // Elementos desde el índice hacia adelante
        ...array.slice(0, index), // Elementos desde el inicio hasta el índice
    ];
}
function AnimeUpcomingNextSeason({ season, seasonYear }) {
    const { data, loading, error } = useQuery(GET_ANIME_UPCOMING_SEASON, {
        variables: {
            page: 1,
            perPage: 10,
            type: "ANIME",
            status: "NOT_YET_RELEASED",
            season,
            seasonYear,
            sort: "POPULARITY_DESC",
        },
    });
    const [currentAnimeIndex, setCurrentAnimeIndex] = useState(0);
    const [isMuted, setIsMuted] = useState(true);
    const iframeRef = useRef(null);
    const navigate = useNavigate();

    const handleNavigateToAnime = (animeId) => {
        navigate(`/anime/${animeId}`);
    };
    const toggleMute = () => {
        const action = isMuted ? "unMute" : "mute";
        iframeRef.current.contentWindow.postMessage(
            `{"event":"command","func":"${action}","args":""}`,
            "*"
        );
        setIsMuted(!isMuted);
    };
    useEffect(() => {
        setIsMuted(true);
    }, [currentAnimeIndex]);
    const handlePreviousAnime = () => {
        setCurrentAnimeIndex((prevIndex) =>
            prevIndex > 0 ? prevIndex - 1 : data.Page.media.length - 1
        );
    };
    const handleNextAnime = () => {
        setCurrentAnimeIndex((prevIndex) =>
            prevIndex < data.Page.media.length - 1 ? prevIndex + 1 : 0
        );
    };
    const handleSelectAnimeDirectly = (reorderedIndex) => {
        setCurrentAnimeIndex(
            (prevIndex) => (prevIndex + reorderedIndex) % data.Page.media.length
        );
    };

    if (loading)
        return (
            <section id="anime-upcoming-season">
                <p>Loading...</p>;
            </section>
        );
    if (error)
        return (
            <section id="anime-upcoming-season">
                <p>Error: {error.message}</p>;
            </section>
        );

    const animesArray = reorderArrayByIndex(data.Page.media, currentAnimeIndex);
    return (
        <section id="anime-upcoming-season">
            <h2>Anime upcoming next season</h2>
            <div className="main-container">
                <iframe
                    ref={iframeRef}
                    key={currentAnimeIndex}
                    src={`https://www.youtube.com/embed/${data.Page.media[currentAnimeIndex].trailer.id}?autoplay=1&mute=1&loop=1&playlist=${data.Page.media[currentAnimeIndex].trailer.id}&enablejsapi=1&controls=0&modestbranding=1&rel=0&showinfo=0&fs=0&disablekb=1`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                ></iframe>
                <div className="video-overlay"></div>
                <div className="anime-data">
                    <h3>
                        {animesArray[0].title.english ||
                            animesArray[0].title.romaji}
                    </h3>
                    <p>Genres: {animesArray[0].genres.join(", ")}</p>
                    <p>
                        Release date:{" "}
                        {animesArray[0].day
                            ? `${animesArray[0].startDate.year}/${animesArray[0].startDate.month}/${animesArray[0].startDate.day}`
                            : `${animesArray[0].startDate.year}/${animesArray[0].startDate.month}`}
                    </p>
                    <button
                        onClick={() => handleNavigateToAnime(animesArray[0].id)}
                    >
                        More Info
                    </button>
                    <button onClick={toggleMute}>
                        {isMuted ? "Unmute Trailer" : "Mute Trailer"}
                    </button>
                </div>
                <div className="change-anime-container">
                    <button onClick={() => handlePreviousAnime()}>
                        <ArrowBackIosNewRoundedIcon />
                    </button>
                    <button onClick={() => handleNextAnime()}>
                        <ArrowForwardNewRoundedIcon />
                    </button>
                </div>
                <div className="anime-list-container">
                    {animesArray.map((animeData, index) => (
                        <button
                            key={animeData.id}
                            className={"upcoming-season-anime-item"}
                            onClick={() => handleSelectAnimeDirectly(index)}
                        >
                            <img
                                src={animeData.coverImage.extraLarge}
                                alt={
                                    animeData.title.english ||
                                    animeData.title.romaji
                                }
                            />
                            <p>
                                {animeData.title.english ||
                                    animeData.title.romaji}
                            </p>
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default AnimeUpcomingNextSeason;
