import { useState, useEffect } from "react";
import { useQuery, useLazyQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import {
    TrendingUpRounded,
    LocalFireDepartmentRounded,
    StarRounded,
} from "@mui/icons-material";
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";
import { GET_GENRES, GET_MEDIA_BY_FILTER } from "../../graphql/queries";
import "./DiscoverByFiltersSection.css";

function DiscoverByFiltersSection() {
    const [sortFilter, setSortFilter] = useState("TRENDING_DESC");
    const [genreFilter, setGenreFilter] = useState([]);
    const navigate = useNavigate();
    // Query para obtener géneros
    const [
        fetchGenres,
        { data: genreData, loading: loadingGenres, error: errorGenres },
    ] = useLazyQuery(GET_GENRES);

    // Query para obtener animes con filtros
    const [fetchAnimes, { data, loading, error, refetch }] = useLazyQuery(
        GET_MEDIA_BY_FILTER,
        {
            variables: {
                page: 1,
                perPage: 10,
                sort: sortFilter,
                genreIn: genreFilter.length > 0 ? genreFilter : null,
                type: "ANIME",
            },
        }
    );

    const handleNavigate = (animeId) => {
        navigate(`/anime/${animeId}`);
    };
    // Manejo de cambios en el filtro de orden
    const handleSortFilterChange = (filter) => {
        setSortFilter(filter);
    };

    // Manejo de cambios en géneros (toggle)
    const handleGenreFilterToggle = (filter) => {
        setGenreFilter((prevGenres) =>
            prevGenres.includes(filter)
                ? prevGenres.filter((g) => g !== filter)
                : [...prevGenres, filter]
        );
    };

    useEffect(() => {
        if (!genreData || genreData.length === 0) {
            fetchGenres();
        }
    }, [fetchGenres]);

    useEffect(() => {
        if (genreFilter.length > 0 || sortFilter) {
            refetch();
        }
    }, [sortFilter, genreFilter, fetchAnimes]);

    return (
        <section id="discover-by-filter">
            <div className="sort-filters-container">
                <button
                    className={sortFilter === "TRENDING_DESC" ? "active" : ""}
                    onClick={() => handleSortFilterChange("TRENDING_DESC")}
                >
                    <TrendingUpRounded fontSize="medium" />
                    Trending Now
                </button>
                <button
                    className={sortFilter === "POPULARITY_DESC" ? "active" : ""}
                    onClick={() => handleSortFilterChange("POPULARITY_DESC")}
                >
                    <LocalFireDepartmentRounded fontSize="medium" />
                    Popular Now
                </button>
                <button
                    className={sortFilter === "SCORE_DESC" ? "active" : ""}
                    onClick={() => handleSortFilterChange("SCORE_DESC")}
                >
                    <StarRounded fontSize="medium" />
                    Best Score
                </button>
            </div>

            <div className="genre-filters-container">
                {loadingGenres ? (
                    <p>Loading genres...</p>
                ) : errorGenres ? (
                    <p>Error loading genres</p>
                ) : (
                    genreData?.GenreCollection.map(
                        (genre) =>
                            genre !== "Hentai" && (
                                <button
                                    key={genre}
                                    onClick={() =>
                                        handleGenreFilterToggle(genre)
                                    }
                                    className={
                                        genreFilter.includes(genre)
                                            ? "filter-button active"
                                            : "filter-button"
                                    }
                                >
                                    {genre}
                                </button>
                            )
                    )
                )}
            </div>
            <div className="anime-container">
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>{error.message}</p>
                ) : (
                    data?.Page?.media.map((anime) => (
                        <button
                            key={anime.id}
                            className="anime-card"
                            onClick={() => handleNavigate(anime.id)}
                        >
                            <img
                                src={
                                    anime.coverImage.extraLarge
                                        ? anime.coverImage.extraLarge
                                        : anime.coverImage.large
                                }
                                alt={anime.title.english}
                            />
                            <div className="anime-data">
                                <h4>{anime.title.english}</h4>
                                <div className="extra-details">
                                    <p>{anime.startDate.year}</p>
                                    <p>
                                        <StarRateRoundedIcon fontSize="small" />
                                        {anime.averageScore}%
                                    </p>
                                </div>
                            </div>
                        </button>
                    ))
                )}
            </div>
        </section>
    );
}

export default DiscoverByFiltersSection;
