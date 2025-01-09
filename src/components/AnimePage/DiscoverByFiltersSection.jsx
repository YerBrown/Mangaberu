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

// Componente para mostrar placeholders mientras se cargan datos
function LoadingPlaceholders({ count }) {
    return Array.from({ length: count }).map((_, index) => (
        <button key={`empty-${index}`} className="anime-card">
            <img src="/src/assets/images/M-White.png" alt="Dark Theme Logo" />
            <h4>Loading...</h4>
        </button>
    ));
}

// Componente para renderizar los filtros de género
function GenreFilters({ genres, selectedGenres, onToggle }) {
    return (
        <div className="genre-filters-container">
            {genres.map((genre) => (
                <button
                    key={genre}
                    onClick={() => onToggle(genre)}
                    className={
                        selectedGenres.includes(genre)
                            ? "filter-button active"
                            : "filter-button"
                    }
                >
                    {genre}
                </button>
            ))}
        </div>
    );
}

// Componente principal
function DiscoverByFiltersSection() {
    const [sortFilter, setSortFilter] = useState("TRENDING_DESC");
    const [genreFilter, setGenreFilter] = useState([]);
    const navigate = useNavigate();

    const [
        fetchGenres,
        { data: genreData, loading: loadingGenres, error: errorGenres },
    ] = useLazyQuery(GET_GENRES);

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

    const handleNavigate = (animeId) => {
        navigate(`/anime/${animeId}`);
    };

    const handleSortFilterChange = (filter) => {
        setSortFilter(filter);
    };

    const handleGenreFilterToggle = (filter) => {
        setGenreFilter((prevGenres) =>
            prevGenres.includes(filter)
                ? prevGenres.filter((g) => g !== filter)
                : [...prevGenres, filter]
        );
    };

    const genresToDisplay = (genreData?.GenreCollection || []).filter(
        (genre) => !["Hentai", "Ecchi", "Mahou Shoujo"].includes(genre)
    );

    return (
        <section id="discover-by-filter">
            <div className="sort-filters-container">
                {["TRENDING_DESC", "POPULARITY_DESC", "SCORE_DESC"].map(
                    (filter, index) => {
                        const icons = [
                            <TrendingUpRounded fontSize="medium" />,
                            <LocalFireDepartmentRounded fontSize="medium" />,
                            <StarRounded fontSize="medium" />,
                        ];
                        const labels = [
                            "Trending Now",
                            "Popular Now",
                            "Best Score",
                        ];

                        return (
                            <button
                                key={filter}
                                className={
                                    sortFilter === filter ? "active" : ""
                                }
                                onClick={() => handleSortFilterChange(filter)}
                            >
                                {icons[index]} {labels[index]}
                            </button>
                        );
                    }
                )}
            </div>

            {loadingGenres ? (
                <p>Loading genres...</p>
            ) : errorGenres ? (
                <p>Error loading genres</p>
            ) : (
                <GenreFilters
                    genres={genresToDisplay}
                    selectedGenres={genreFilter}
                    onToggle={handleGenreFilterToggle}
                />
            )}

            <div className="anime-container">
                {loading ? (
                    <LoadingPlaceholders count={10} />
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
                                    anime.coverImage.extraLarge ||
                                    anime.coverImage.large
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
