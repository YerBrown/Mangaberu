import { useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_TOP_10_SORT_GENRE } from "../../graphql/queries";
import "./AnimeList.css";

// Componente para cada tarjeta de anime
function AnimeCard({ anime, onNavigate }) {
    const { id, coverImage, title, genres, episodes, averageScore, status } =
        anime;

    return (
        <button
            key={id}
            className="anime-card"
            onClick={() => onNavigate(`/anime/${id}`)}
        >
            <img
                src={coverImage.extraLarge}
                alt={title.romaji || title.english}
            />
            <div className="anime-data">
                <h3>{title.romaji || title.english}</h3>
                <div className="genres-episodes">
                    <p className="genres">{genres.join(", ")}</p>
                    {episodes && <p>Episodes: {episodes}</p>}
                </div>
                <div className="score-status">
                    <p>Score: {averageScore} %</p>
                    <p>Status: {status}</p>
                </div>
            </div>
        </button>
    );
}

// Componente principal AnimeList
function AnimeList({ sortFilter, genreFilter, mediaType }) {
    const { data, loading, error } = useQuery(GET_TOP_10_SORT_GENRE, {
        variables: {
            page: 1,
            perPage: 10,
            type: mediaType,
            sort: sortFilter,
            genreIn: genreFilter,
        },
        skip: true,
    });

    const navigate = useNavigate();

    const handleNavigate = (route) => {
        navigate(route);
    };

    if (loading) {
        return (
            <div className="anime-list">
                <p>Loading...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="anime-list">
                <p>Error: {error.message}</p>
            </div>
        );
    }

    return (
        <div className="anime-list">
            <div className="anime-card-container">
                {data.Page.media.map((anime) => (
                    <AnimeCard
                        key={anime.id}
                        anime={anime}
                        onNavigate={handleNavigate}
                    />
                ))}
            </div>
        </div>
    );
}

export default AnimeList;
