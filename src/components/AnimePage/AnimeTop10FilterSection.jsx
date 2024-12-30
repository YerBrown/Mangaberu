import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useTheme } from "../../context/ThemeContext";
import { GET_GENRES } from "../../graphql/queries";
import AnimeList from "./AnimeList";
import "./AnimeTop10FilterSection.css";
function AnimeTop10FilterSection() {
    const { data, loading, error } = useQuery(GET_GENRES, {
        variables: {},
        skip: true,
    });
    const [sortFilter, setSortFilter] = useState("POPULARITY_DESC");
    const [genreFilter, setGenreFilter] = useState(null);

    useEffect(() => {
        console.log(`Sort Filter changed to: ${sortFilter}`);
        console.log(`Genre Filter changed to: ${genreFilter}`);
    }, [sortFilter, genreFilter]);

    const handleSortFilter = (sort) => {
        setSortFilter(sort);
    };

    const handleGenreFilter = (genre = null) => {
        if (genreFilter == genre) {
            setGenreFilter(null);
        } else {
            setGenreFilter(genre);
        }
    };

    if (loading)
        return (
            <section id="top10-filter-section">
                <p>Loading...</p>
            </section>
        );
    if (error)
        return (
            <section id="top10-filter-section">
                <p>Error: {error.message}</p>;
            </section>
        );

    return (
        <section id="top10-filter-section">
            <div className="filters-container">
                <h2>
                    Top 10 anime by{" "}
                    {sortFilter.replace("_DESC", "").toLowerCase()}
                </h2>
                <div className="sort-buttons">
                    <button
                        onClick={() => handleSortFilter("POPULARITY_DESC")}
                        className={
                            "POPULARITY_DESC" == sortFilter
                                ? "filter-button active"
                                : "filter-button"
                        }
                    >
                        Popularity
                    </button>
                    <button
                        onClick={() => handleSortFilter("TRENDING_DESC")}
                        className={
                            "TRENDING_DESC" == sortFilter
                                ? "filter-button active"
                                : "filter-button"
                        }
                    >
                        Trending
                    </button>
                    <button
                        onClick={() => handleSortFilter("SCORE_DESC")}
                        className={
                            "SCORE_DESC" == sortFilter
                                ? "filter-button active"
                                : "filter-button"
                        }
                    >
                        Score
                    </button>
                </div>
                <div className="genre-buttons">
                    {data.GenreCollection.map((genre, index) =>
                        genre !== "Hentai" ? (
                            <button
                                key={index}
                                className={
                                    genre == genreFilter
                                        ? "filter-button active"
                                        : "filter-button"
                                }
                                onClick={() => handleGenreFilter(genre)}
                            >
                                <p>{genre}</p>
                            </button>
                        ) : null
                    )}
                </div>
            </div>
            <AnimeList
                sortFilter={sortFilter}
                genreFilter={genreFilter}
                mediaType={"ANIME"}
            />
        </section>
    );
}

export default AnimeTop10FilterSection;
