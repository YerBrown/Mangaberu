import { Link } from "react-router-dom";
import { useModal } from "../../context/ModalContext";
import "./AnimeList.css";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import { useState, useEffect } from "react";
const renderItems = (animeLists, status, openEdit) => {
    const list = animeLists.find((list) => list.status === status);
    if (!list) return null;
    return (
        <>
            <h3>{list.name}</h3>
            <div className="list-grid">
                {list.entries.map((entry) => (
                    <div key={entry.media.id} className="anime-item">
                        <img
                            src={entry.media.coverImage.extraLarge}
                            alt={
                                entry.media.title.english ||
                                entry.media.title.romaji
                            }
                        />
                        <button onClick={() => openEdit(entry)}>
                            <EditRoundedIcon />
                        </button>
                        <div className="progress-data">
                            <Link to={`/anime/${entry.media.id}`}>
                                <h4>
                                    {entry.media.title.english
                                        ? entry.media.title.english
                                        : entry.media.title.romaji}
                                </h4>
                            </Link>
                            <p>
                                Chapters:{" "}
                                {entry.media.episodes
                                    ? `${entry.progress}/${entry.media.episodes}`
                                    : entry.progress}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

function AnimeList({ animeLists }) {
    const { openModal } = useModal();
    const [currentAnimeList, setCurrentAnimeList] = useState(animeLists);
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const handleStatusFilter = (status) => {
        setStatusFilter(status);
        filterAnimeList(searchQuery, status);
    };
    const handleSearch = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        filterAnimeList(query, statusFilter);
    };
    const handleClearSearch = () => {
        setSearchQuery("");
        filterAnimeList("", statusFilter);
    };
    const filterAnimeList = (query, status) => {
        const filtered = animeLists
            .map((list) => {
                // Filtra las entries dentro de cada lista que coincidan con el título
                const filteredEntries = list.entries.filter((entry) =>
                    entry.media.title.english
                        ?.toLowerCase()
                        .includes(query.toLowerCase())
                );

                // Devuelve una nueva lista con solo las entries que coinciden
                return {
                    ...list,
                    entries: filteredEntries,
                };
            })
            .filter((list) => {
                // Filtra listas que tengan el status deseado y al menos 1 entry
                return (
                    (status === "" || list.status === status) &&
                    list.entries.length > 0
                );
            });

        setCurrentAnimeList(filtered);
    };
    useEffect(() => {
        filterAnimeList(searchQuery, statusFilter); // Mantiene los filtros activos
    }, [animeLists]);
    return (
        <>
            <div className="filter-container">
                <div className="title-filter-input">
                    <input
                        type="text"
                        placeholder="Filter"
                        value={searchQuery}
                        onChange={handleSearch}
                    />
                    <SearchRoundedIcon className="search-icon" />
                    <button
                        className={
                            searchQuery != ""
                                ? "remove-icon active"
                                : "remove-icon"
                        }
                        onClick={handleClearSearch}
                    >
                        <CancelRoundedIcon fontSize="small" />
                    </button>
                </div>
                <div className="status-filter">
                    <h4>Lists:</h4>
                    <button
                        onClick={() => handleStatusFilter("")}
                        className={statusFilter === "" ? "active" : ""}
                    >
                        All
                    </button>
                    <button
                        onClick={() => handleStatusFilter("CURRENT")}
                        className={statusFilter === "CURRENT" ? "active" : ""}
                    >
                        Watching
                    </button>
                    <button
                        onClick={() => handleStatusFilter("PLANNING")}
                        className={statusFilter === "PLANNING" ? "active" : ""}
                    >
                        Planning
                    </button>
                    <button
                        onClick={() => handleStatusFilter("COMPLETED")}
                        className={statusFilter === "COMPLETED" ? "active" : ""}
                    >
                        Completed
                    </button>
                    <button
                        onClick={() => handleStatusFilter("PAUSED")}
                        className={statusFilter === "PAUSED" ? "active" : ""}
                    >
                        Paused
                    </button>
                    <button
                        onClick={() => handleStatusFilter("DROPPED")}
                        className={statusFilter === "DROPPED" ? "active" : ""}
                    >
                        Dropped
                    </button>
                </div>
            </div>
            <div className="user-anime-list">
                <h2>Anime List</h2>
                <div className="list-container">
                    <div className="current">
                        {renderItems(currentAnimeList, "CURRENT", openModal)}
                    </div>
                    <div className="planning">
                        {renderItems(currentAnimeList, "PLANNING", openModal)}
                    </div>
                    <div className="completed">
                        {renderItems(currentAnimeList, "COMPLETED", openModal)}
                    </div>
                    <div className="paused">
                        {renderItems(currentAnimeList, "PAUSED", openModal)}
                    </div>
                    <div className="droped">
                        {renderItems(currentAnimeList, "DROPPED", openModal)}
                    </div>
                </div>
            </div>
        </>
    );
}

export default AnimeList;
