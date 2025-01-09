import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_GENRES } from "../../graphql/queries";
import AnimeList from "./AnimeList";
import "./AnimeTop10FilterSection.css";

// Componente para los botones de filtro de ordenación
function SortFilterButtons({ sortFilter, onSortChange }) {
    const sortOptions = [
        { label: "Popularity", value: "POPULARITY_DESC" },
        { label: "Trending", value: "TRENDING_DESC" },
        { label: "Score", value: "SCORE_DESC" },
    ];

    return (
        <div className="sort-buttons">
            {sortOptions.map(({ label, value }) => (
                <button
                    key={value}
                    className={`filter-button ${
                        sortFilter === value ? "active" : ""
                    }`}
                    onClick={() => onSortChange(value)}
                >
                    {label}
                </button>
            ))}
        </div>
    );
}

// Componente para los botones de filtro de género
function GenreFilterButtons({ genres, genreFilter, onGenreChange }) {
    return (
        <div className="genre-buttons">
            {genres
                .filter((genre) => genre !== "Hentai")
                .map((genre, index) => (
                    <button
                        key={index}
                        className={`filter-button ${
                            genreFilter === genre ? "active" : ""
                        }`}
                        onClick={() => onGenreChange(genre)}
                    >
                        <p>{genre}</p>
                    </button>
                ))}
        </div>
    );
}

// Componente principal
function AnimeTop10FilterSection() {
    const { data, loading, error } = useQuery(GET_GENRES, {
        skip: true,
    });

    const [sortFilter, setSortFilter] = useState("POPULARITY_DESC");
    const [genreFilter, setGenreFilter] = useState(null);

    useEffect(() => {
        console.log(`Sort Filter changed to: ${sortFilter}`);
        console.log(`Genre Filter changed to: ${genreFilter}`);
    }, [sortFilter, genreFilter]);

    const handleSortFilterChange = (sort) => setSortFilter(sort);
    const handleGenreFilterChange = (genre) =>
        setGenreFilter((prev) => (prev === genre ? null : genre));

    if (loading) {
        return (
            <section id="top10-filter-section">
                <p>Loading...</p>
            </section>
        );
    }

    if (error) {
        return (
            <section id="top10-filter-section">
                <p>Error: {error.message}</p>
            </section>
        );
    }

    return (
        <section id="top10-filter-section">
            <div className="filters-container">
                <h2>
                    Top 10 anime by{" "}
                    {sortFilter.replace("_DESC", "").toLowerCase()}
                </h2>
                <SortFilterButtons
                    sortFilter={sortFilter}
                    onSortChange={handleSortFilterChange}
                />
                <GenreFilterButtons
                    genres={data?.GenreCollection || []}
                    genreFilter={genreFilter}
                    onGenreChange={handleGenreFilterChange}
                />
            </div>
            <AnimeList
                sortFilter={sortFilter}
                genreFilter={genreFilter}
                mediaType="ANIME"
            />
        </section>
    );
}

export default AnimeTop10FilterSection;
