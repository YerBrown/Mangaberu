import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useLazyQuery } from "@apollo/client";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { GET_SEARCH } from "../graphql/queries";
import "./SearchBar.css";
function SearchBar() {
    const [inputValue, setInputValue] = useState("");
    const [debouncedInputValue, setDebouncedInputValue] = useState("");
    const debounceTimeoutRef = useRef(null);
    const [fetchSearch, { data, loading, error }] = useLazyQuery(GET_SEARCH, {
        variables: {
            page: 1,
            perPage: 8,
            search: debouncedInputValue,
        },
    });

    const navigate = useNavigate();
    const handleNavigate = (url) => {
        navigate(url);
    };
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    useEffect(() => {
        if (debounceTimeoutRef.current) {
            clearTimeout(debounceTimeoutRef.current);
        }

        debounceTimeoutRef.current = setTimeout(() => {
            setDebouncedInputValue(inputValue);
        }, 1000);
        if (inputValue.length > 0) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            if (debounceTimeoutRef.current) {
                clearTimeout(debounceTimeoutRef.current);
            }
            document.body.style.overflow = "auto";
        };
    }, [inputValue]);

    useEffect(() => {
        if (debouncedInputValue.length > 0) {
            console.log("Debounce input value: ", debouncedInputValue);
            fetchSearch();
        }
    }, [debouncedInputValue]);

    return (
        <>
            <div
                className={
                    inputValue.length > 0
                        ? "search-modal active"
                        : "search-modal"
                }
            >
                <div className="search-container">
                    <div className="search-results">
                        <h4>Anime</h4>
                        {loading ? (
                            <p>Loading...</p>
                        ) : error ? (
                            <p>Error loading results</p>
                        ) : data ? (
                            <div className="item-container">
                                {data.animes.media.map((anime) => (
                                    <button
                                        className="search-item"
                                        key={anime.id}
                                        onClick={() =>
                                            handleNavigate(`/anime/${anime.id}`)
                                        }
                                    >
                                        <img
                                            src={anime.coverImage.large}
                                            alt=""
                                        />
                                        <div>
                                            <h5>
                                                {anime.title.english ||
                                                    anime.title.romaji}
                                            </h5>
                                            {anime.startDate.year != null && (
                                                <p>
                                                    {anime.startDate.year +
                                                        " " +
                                                        anime.format}
                                                </p>
                                            )}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        ) : null}
                    </div>
                    <div className="search-results">
                        <h4>Manga</h4>
                        {loading ? (
                            <p>Loading...</p>
                        ) : error ? (
                            <p>Error loading results</p>
                        ) : data ? (
                            <div className="item-container">
                                {data.mangas.media.map((manga) => (
                                    <button
                                        className="search-item"
                                        key={manga.id}
                                        onClick={() =>
                                            handleNavigate(`/manga/${manga.id}`)
                                        }
                                    >
                                        <img
                                            src={manga.coverImage.large}
                                            alt=""
                                        />
                                        <div>
                                            <h5>
                                                {manga.title.english ||
                                                    manga.title.romaji}
                                            </h5>

                                            {manga.startDate.year != null && (
                                                <p>
                                                    {manga.startDate.year +
                                                        " " +
                                                        manga.format}
                                                </p>
                                            )}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder=""
                    value={inputValue}
                    onChange={handleInputChange}
                    className="search-input"
                />
                <button type="submit" className="search-button">
                    <SearchOutlinedIcon fontSize="medium" />
                </button>
            </div>
        </>
    );
}

export default SearchBar;
