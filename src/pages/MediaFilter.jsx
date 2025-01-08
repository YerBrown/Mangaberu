import { useQuery, useLazyQuery } from "@apollo/client";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import MultiSelector from "../components/MultiSelector";
import Selector from "../components/Selector";
import TextInput from "../components/TextInput";
import { useAuth } from "../context/AuthContext";
import { GET_MEDIA_BY_FILTER_SEARCH } from "../graphql/queries";
import TuneRoundedIcon from "@mui/icons-material/TuneRounded";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import NavigateBeforeRoundedIcon from "@mui/icons-material/NavigateBeforeRounded";
import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";
import "./MediaFilter.css";
function MediaFilter() {
    const { userData, isLoading } = useAuth();
    const [isExtra, setIsExtra] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [typeFilter, setTypeFilter] = useState("ANIME");
    const [sortFilter, setSortFilter] = useState("POPULARITY_DESC");
    const [searchFilter, setSearchFilter] = useState("");
    const [genreFilter, setGenreFilter] = useState([]);
    const [yearFilter, setYearFilter] = useState(null);
    const [formatFilter, setFormatFilter] = useState(null);
    const [statusFilter, setStatusFilter] = useState(null);
    const [resetTrigger, setResetTrigger] = useState(0);
    const [streamingFilter, setStreamingFilter] = useState([]);
    const navigate = useNavigate();
    const getYearsArray = (startYear = 1940) => {
        const currentYear = new Date().getFullYear();
        const endYear = currentYear + 2;
        const years = [];

        for (let year = startYear; year <= endYear; year++) {
            years.push({ id: year, label: year });
        }

        return years.reverse();
    };

    const [fetchMedia, { data, loading, error, refetch }] = useLazyQuery(
        GET_MEDIA_BY_FILTER_SEARCH,
        {
            fetchPolicy: "cache-and-network",
            notifyOnNetworkStatusChange: true,
        }
    );
    const buildVariables = () => {
        const variables = {
            page: currentPage,
            perPage: 10,
            sort: sortFilter,
            type: typeFilter,
            genreIn: genreFilter.length > 0 ? genreFilter : null,
            search: searchFilter || null,
            year: yearFilter ? yearFilter + "%" : null,
            formatIn: formatFilter || null,
            status: statusFilter || null,
            licensedBy:
                streamingFilter.length > 0 && typeFilter === "ANIME"
                    ? streamingFilter
                    : null,
        };

        // Filtrar las variables que sean null o undefined
        return Object.fromEntries(
            Object.entries(variables).filter(([_, value]) => value !== null)
        );
    };
    const handleSearch = () => {
        setCurrentPage(1);
        fetchMedia({
            variables: buildVariables(),
        });
    };
    const handleTitleSearchFilter = (search) => {
        setSearchFilter(search);
    };
    const handleTypeFilterChange = (filter) => {
        setTypeFilter(filter);
        setResetTrigger((prev) => prev + 1);
        setFormatFilter(null);
    };
    const handleSortFilterChange = (filter) => {
        setSortFilter(filter);
    };
    const handleToggleGenreFilter = (genres) => {
        setGenreFilter(genres);
    };
    const handleYearFilterChange = (year) => {
        setYearFilter(year);
    };
    const handleToggleExtra = () => {
        setIsExtra(!isExtra);
    };
    const handleFormatFilterChange = (format) => {
        setFormatFilter(format);
    };
    const handleStatusFilterChange = (status) => {
        setStatusFilter(status);
    };
    const handleStreamingFilterToggle = (streaming) => {
        setStreamingFilter(streaming);
    };
    useEffect(() => {
        fetchMedia({
            variables: buildVariables(),
        });
    }, [currentPage, setCurrentPage]);

    const handlePrevPage = () => {
        setCurrentPage((prev) => {
            if (prev > 1) {
                return prev - 1;
            } else {
                return prev;
            }
        });
    };

    const handleNextPage = () => {
        setCurrentPage((prev) => {
            if (prev < data.Page.pageInfo.total) {
                return prev + 1;
            } else {
                return prev;
            }
        });
    };
    const handleNavigate = (route) => {
        navigate(route);
    };

    return (
        <>
            <header>
                {userData ? (
                    <Navbar
                        userAvatar={userData.avatar.medium}
                        activeMenu="media"
                    />
                ) : (
                    <Navbar activeMenu="media" />
                )}
            </header>
            <main>
                <div id="media-filter-menu">
                    <div className="filters">
                        <div className="main-filters">
                            <div>
                                <label htmlFor="media">Media Type</label>
                                <Selector
                                    options={[
                                        { id: "ANIME", label: "Anime" },
                                        { id: "MANGA", label: "Manga" },
                                    ]}
                                    onChange={handleTypeFilterChange}
                                    noOptionText={"Any"}
                                    defaultValue={0}
                                    noNull={true}
                                />
                            </div>
                            <div>
                                <label htmlFor="sort">Sort By</label>
                                <Selector
                                    options={[
                                        {
                                            id: "POPULARITY_DESC",
                                            label: "Popularity",
                                        },
                                        {
                                            id: "TRENDING_DESC",
                                            label: "Trending",
                                        },
                                        {
                                            id: "SCORE_DESC",
                                            label: "Average Score",
                                        },
                                    ]}
                                    onChange={handleSortFilterChange}
                                    noOptionText={"Any"}
                                    defaultValue={0}
                                    noNull={true}
                                />
                            </div>
                            <button onClick={() => handleSearch()}>
                                <SearchOutlinedIcon />
                            </button>
                        </div>
                        <div className="filter-container active">
                            <div className="search-input">
                                <label htmlFor="search">Search</label>
                                <TextInput onSubmit={handleTitleSearchFilter} />
                            </div>
                            <div>
                                <label htmlFor="genres">Genres</label>
                                <MultiSelector
                                    options={[
                                        {
                                            id: "Action",
                                            label: "Action",
                                        },
                                        {
                                            id: "Adventure",
                                            label: "Adventure",
                                        },
                                        {
                                            id: "Comedy",
                                            label: "Comedy",
                                        },
                                        {
                                            id: "Drama",
                                            label: "Drama",
                                        },
                                        {
                                            id: "Ecchi",
                                            label: "Ecchi",
                                        },
                                        {
                                            id: "Fantasy",
                                            label: "Fantasy",
                                        },
                                        {
                                            id: "Horror",
                                            label: "Horror",
                                        },
                                        {
                                            id: "Mecha",
                                            label: "Mecha",
                                        },
                                        {
                                            id: "Music",
                                            label: "Music",
                                        },
                                        {
                                            id: "Mystery",
                                            label: "Mystery",
                                        },
                                        {
                                            id: "Psychological",
                                            label: "Psychological",
                                        },
                                        {
                                            id: "Romance",
                                            label: "Romance",
                                        },
                                        {
                                            id: "Sci-Fi",
                                            label: "Sci-Fi",
                                        },
                                        {
                                            id: "Slice of Life",
                                            label: "Slice of Life",
                                        },
                                        {
                                            id: "Sports",
                                            label: "Sports",
                                        },
                                        {
                                            id: "Supernatural",
                                            label: "Supernatural",
                                        },
                                        {
                                            id: "Thriller",
                                            label: "Thriller",
                                        },
                                    ]}
                                    noOptionText={"Any"}
                                    onChange={handleToggleGenreFilter}
                                />
                            </div>
                            <div>
                                <label htmlFor="year">Year</label>
                                <Selector
                                    options={getYearsArray()}
                                    noOptionText={"Any"}
                                    onChange={handleYearFilterChange}
                                />
                            </div>
                            <button
                                className={
                                    isExtra ? "show-extra active" : "show-extra"
                                }
                                onClick={() => handleToggleExtra()}
                            >
                                <TuneRoundedIcon />
                            </button>
                        </div>
                        <div
                            className={
                                isExtra
                                    ? "filter-container active"
                                    : "filter-container"
                            }
                        >
                            <div>
                                <label htmlFor="format">Format</label>
                                {typeFilter === "ANIME" ? (
                                    <Selector
                                        options={[
                                            {
                                                id: "TV",
                                                label: "TV Show",
                                            },
                                            {
                                                id: "MOVIE",
                                                label: "Movie",
                                            },
                                            {
                                                id: "TV_SHORT",
                                                label: "TV Short",
                                            },
                                            {
                                                id: "SPECIAL",
                                                label: "Special",
                                            },
                                            {
                                                id: "OVA",
                                                label: "OVA",
                                            },
                                            {
                                                id: "ONA",
                                                label: "ONA",
                                            },
                                            {
                                                id: "MUSIC",
                                                label: "Music",
                                            },
                                        ]}
                                        noOptionText={"Any"}
                                        resetTrigger={resetTrigger}
                                        onChange={handleFormatFilterChange}
                                    />
                                ) : (
                                    <Selector
                                        options={[
                                            {
                                                id: "MANGA",
                                                label: "Manga",
                                            },
                                            {
                                                id: "NOVEL",
                                                label: "Novel",
                                            },
                                            {
                                                id: "ONE_SHOT",
                                                label: "One Shot",
                                            },
                                        ]}
                                        noOptionText={"Any"}
                                        resetTrigger={resetTrigger}
                                        onChange={handleFormatFilterChange}
                                    />
                                )}
                            </div>
                            <div>
                                <label htmlFor="status">
                                    {typeFilter === "ANIME"
                                        ? "Airing Status"
                                        : "Releasing Status"}
                                </label>
                                <Selector
                                    options={
                                        typeFilter === "ANIME"
                                            ? [
                                                  {
                                                      id: "RELEASING",
                                                      label: "Airing",
                                                  },
                                                  {
                                                      id: "FINISHED",
                                                      label: "Finished",
                                                  },
                                                  {
                                                      id: "NOT_YET_RELEASED",
                                                      label: "Not Yet Aired",
                                                  },
                                                  {
                                                      id: "CANCELLED",
                                                      label: "Canceled",
                                                  },
                                              ]
                                            : [
                                                  {
                                                      id: "RELEASING",
                                                      label: "Releasing",
                                                  },
                                                  {
                                                      id: "FINISHED",
                                                      label: "Finished",
                                                  },
                                                  {
                                                      id: "NOT_YET_RELEASED",
                                                      label: "Not Yet Released",
                                                  },
                                                  {
                                                      id: "CANCELLED",
                                                      label: "Canceled",
                                                  },
                                              ]
                                    }
                                    noOptionText={"Any"}
                                    onChange={handleStatusFilterChange}
                                />
                            </div>
                            {typeFilter === "ANIME" ? (
                                <div>
                                    <label htmlFor="streaming">
                                        Streaming On
                                    </label>
                                    <MultiSelector
                                        options={[
                                            {
                                                id: "5",
                                                label: "Crunchyroll",
                                            },
                                            {
                                                id: "10",
                                                label: "Netflix",
                                            },
                                            {
                                                id: "13",
                                                label: "YouTube",
                                            },
                                            {
                                                id: "21",
                                                label: "Amazon Prime Video",
                                            },
                                            {
                                                id: "118",
                                                label: "Disney Plus",
                                            },
                                            {
                                                id: "211",
                                                label: "Max",
                                            },
                                        ]}
                                        noOptionText={"Any"}
                                        onChange={handleStreamingFilterToggle}
                                    />
                                </div>
                            ) : null}
                        </div>
                    </div>
                    <div className="media-container">
                        <div className="top-part">
                            <button
                                disabled={currentPage == 1}
                                onClick={() => handlePrevPage()}
                            >
                                <NavigateBeforeRoundedIcon />
                            </button>
                            <div className="pagination">{`Page ${currentPage}`}</div>
                            <button
                                disabled={
                                    data
                                        ? !data.Page.pageInfo.hasNextPage
                                        : false
                                }
                                onClick={() => handleNextPage()}
                            >
                                <NavigateNextRoundedIcon />
                            </button>
                        </div>
                        {loading ? (
                            <p>Loading ...</p>
                        ) : error ? (
                            <p>Error loading</p>
                        ) : data ? (
                            <div className="media-items-container">
                                {data.Page.media.map((media) => (
                                    <button
                                        key={media.id}
                                        className="media-item"
                                        onClick={() =>
                                            handleNavigate(
                                                media.type === "ANIME"
                                                    ? `/anime/${media.id}`
                                                    : `/manga/${media.id}`
                                            )
                                        }
                                    >
                                        <img
                                            src={media.coverImage.extraLarge}
                                            alt={
                                                media.title.english ||
                                                media.title.romaji
                                            }
                                        />
                                        <h4>
                                            {media.title.english ||
                                                media.title.romaji}
                                        </h4>
                                    </button>
                                ))}
                            </div>
                        ) : null}
                        <div className="bottom-part">
                            <button
                                disabled={currentPage == 1}
                                onClick={() => handlePrevPage()}
                            >
                                <NavigateBeforeRoundedIcon />
                            </button>
                            <div className="pagination">{`Page ${currentPage}`}</div>
                            <button
                                disabled={
                                    data
                                        ? !data.Page.pageInfo.hasNextPage
                                        : false
                                }
                                onClick={() => handleNextPage()}
                            >
                                <NavigateNextRoundedIcon />
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
export default MediaFilter;
