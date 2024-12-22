import { useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_TOP_10_SORT_GENRE } from "../../graphql/queries";
import "./AnimeList.css";
function AnimeList({ sortFilter, genreFilter, mediaType }) {
    const { data, loading, error } = useQuery(GET_TOP_10_SORT_GENRE, {
        variables: {
            page: 1,
            perPage: 10,
            type: mediaType,
            sort: sortFilter,
            genreIn: genreFilter,
        },
    });
    const navigate = useNavigate();
    if (loading)
        return (
            <div className="anime-list">
                <p>Loading...</p>
            </div>
        );
    if (error)
        return (
            <div className="anime-list">
                <p>Error: {error.message}</p>
            </div>
        );

    const handleNavigate = (route) => {
        navigate(route);
    };
    return (
        <div className="anime-list">
            {data.Page.media.map((anime) => (
                <button
                    key={anime.id}
                    className="anime-card"
                    onClick={() => handleNavigate(`/anime/${anime.id}`)}
                >
                    <img
                        src={anime.coverImage.extraLarge}
                        alt={anime.title.romaji || anime.title.english}
                    />
                    <div className="anime-data">
                        <h3>{anime.title.romaji || anime.title.english}</h3>
                        <div className="genres-episodes">
                            <p className="genres"> {anime.genres.join(", ")}</p>
                            {anime.episodes != null && (
                                <p>Episodes: {anime.episodes}</p>
                            )}
                        </div>
                        <div className="score-status">
                            <p>Score: {anime.averageScore} %</p>
                            <p>Status: {anime.status}</p>
                        </div>
                    </div>
                </button>
            ))}
        </div>
    );
}
export default AnimeList;
