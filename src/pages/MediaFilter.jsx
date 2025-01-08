import { useQuery, useLazyQuery } from "@apollo/client";
import { useState, useEffect } from "react";
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
    const [seasonFilter, setSeasonFilter] = useState(null);

    const getYearsArray = (startYear = 1940) => {
        const currentYear = new Date().getFullYear();
        const endYear = currentYear + 2;
        const years = [];

        for (let year = startYear; year <= endYear; year++) {
            years.push(year);
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
    const handleSearch = () => {
        setCurrentPage(1);
        fetchMedia({
            variables: {
                page: 1,
                perPage: 10,
                sort: sortFilter,
                type: typeFilter,
                ...(!genreFilter || genreFilter.length === 0
                    ? {}
                    : { genreIn: genreFilter }),
                ...(!searchFilter ? {} : { search: searchFilter }),
                ...(!yearFilter ? {} : { year: yearFilter }),
                ...(!seasonFilter ? {} : { season: seasonFilter }),
            },
        });
    };
    const handleTitleSearchFilter = (search) => {
        setSearchFilter(search);
    };
    const handleTypeFilterChange = (filter) => {
        setTypeFilter(filter);
    };
    const handleSortFilterChange = (filter) => {
        setSortFilter(filter);
    };
    const handleToggleGenreFilter = (genre) => {
        setGenreFilter((prev) => {
            return prev.includes(genre)
                ? prev.filter((g) => g !== genre)
                : [...prev, genre];
        });
    };
    const handleYearFilterChange = (year) => {
        setYearFilter(year);
    };
    const handleSeasonFilterChange = (season) => {
        setSeasonFilter(season);
    };
    const handleResetFilters = () => {
        setTypeFilter("ANIME");
        setSortFilter(["POPULARITY_DESC"]);
        setSearchFilter("");
        setGenreFilter([]);
        setYearFilter(null);
        setSeasonFilter(null);
    };
    const handleToggleExtra = () => {
        setIsExtra(!isExtra);
    };
    useEffect(() => {
        fetchMedia({
            variables: {
                page: currentPage,
                perPage: 10,
                sort: sortFilter,
                type: typeFilter,
                ...(!genreFilter || genreFilter.length === 0
                    ? {}
                    : { genreIn: genreFilter }),
                ...(!searchFilter ? {} : { search: searchFilter }),
                ...(!yearFilter ? {} : { year: yearFilter }),
                ...(!seasonFilter ? {} : { season: seasonFilter }),
            },
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
                        <div className="filter-container active">
                            <div className="search-input">
                                <label htmlFor="search">Search</label>
                                <TextInput onSubmit={handleTitleSearchFilter} />
                            </div>
                            <div>
                                <label htmlFor="genres">Genres</label>
                                <MultiSelector
                                    options={[
                                        "Action",
                                        "Adventure",
                                        "Comedy",
                                        "Drama",
                                        "Ecchi",
                                        "Fantasy",
                                        "Horror",
                                        "Mahou Shoujo",
                                        "Mecha",
                                        "Music",
                                        "Mystery",
                                        "Psychological",
                                        "Romance",
                                        "Sci-Fi",
                                        "Slice of Life",
                                        "Sports",
                                        "Supernatural",
                                        "Thriller",
                                    ]}
                                    noOptionText={"Any"}
                                />
                            </div>
                            <div>
                                <label htmlFor="year">Year</label>
                                <Selector
                                    options={getYearsArray()}
                                    noOptionText={"Any"}
                                />
                            </div>
                            <div>
                                <label htmlFor="seasson">Seasson</label>
                                <Selector
                                    options={[
                                        "Winter",
                                        "Spring",
                                        "Summer",
                                        "Fall",
                                    ]}
                                    noOptionText={"Any"}
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
                                <Selector
                                    options={[
                                        "TV Show",
                                        "Movie",
                                        "TV Short",
                                        "Special",
                                        "OVA",
                                        "ONA",
                                        "Music",
                                    ]}
                                    noOptionText={"Any"}
                                />
                            </div>
                            <div>
                                <label htmlFor="status">Airing Status</label>
                                <Selector
                                    options={[
                                        "Airing",
                                        "Finished",
                                        "Not Yet Aired",
                                        "Canceled",
                                    ]}
                                    noOptionText={"Any"}
                                />
                            </div>
                            <div>
                                <label htmlFor="streaming">Streaming On</label>
                                <MultiSelector
                                    options={[
                                        "Crunchyroll",
                                        "Hulu",
                                        "Netflix",
                                        "YouTube",
                                        "Amazon Prime Video",
                                        "Vimeo",
                                        "Adult Swim",
                                        "Disney Plus",
                                        "Max",
                                    ]}
                                    noOptionText={"Any"}
                                />
                            </div>
                        </div>
                        <div className="main-filters">
                            <button onClick={() => handleSearch()}>
                                <SearchOutlinedIcon />
                            </button>
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
                                <label htmlFor="sort">Sort Type</label>
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
                                    <div key={media.id} className="media-item">
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
                                    </div>
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
