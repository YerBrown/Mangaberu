import { Link } from "react-router-dom";
import { useModal } from "../../context/ModalContext";
import { useState, useEffect } from "react";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
const renderItems = (mangaLists, status, openEdit) => {
    const list = mangaLists.find((list) => list.status === status);
    if (!list) return null;
    return (
        <>
            <h3>{list.name}</h3>
            <div className="list-grid">
                {list.entries.map((entry) => (
                    <div key={entry.media.id} className="manga-item">
                        <img
                            src={entry.media.coverImage.large}
                            alt={
                                entry.media.title.english ||
                                entry.media.title.romaji
                            }
                        />
                        <button onClick={() => openEdit(entry, entry.media)}>
                            <EditRoundedIcon />
                        </button>
                        <div className="progress-data">
                            <Link to={`/manga/${entry.media.id}`}>
                                <h4>
                                    {entry.media.title.english
                                        ? entry.media.title.english
                                        : entry.media.title.romaji}
                                </h4>
                            </Link>
                            <p>
                                Chapters:{" "}
                                {entry.media.chapters
                                    ? `${entry.progress}/${entry.media.chapters}`
                                    : entry.progress}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};
function MangaList({ mangaLists }) {
    const { openModal } = useModal();
    const [currentMangaList, setCurrentMangaList] = useState(mangaLists);
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const handleStatusFilter = (status) => {
        setStatusFilter(status);
        filterMangaList(searchQuery, status);
    };
    const handleSearch = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        filterMangaList(query, statusFilter);
    };
    const handleClearSearch = () => {
        setSearchQuery("");
        filterMangaList("", statusFilter);
    };
    const filterMangaList = (query, status) => {
        const filtered = mangaLists
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

        setCurrentMangaList(filtered);
    };
    useEffect(() => {
        filterMangaList(searchQuery, statusFilter); // Mantiene los filtros activos
    }, [mangaLists]);
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
                        Reading
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
            <div className="user-manga-list">
                <h2>Manga List</h2>
                <div className="list-container">
                    <div className="current">
                        {renderItems(currentMangaList, "CURRENT", openModal)}
                    </div>
                    <div className="planning">
                        {renderItems(currentMangaList, "PLANNING", openModal)}
                    </div>
                    <div className="completed">
                        {renderItems(currentMangaList, "COMPLETED", openModal)}
                    </div>
                    <div className="paused">
                        {renderItems(currentMangaList, "PAUSED", openModal)}
                    </div>
                    <div className="droped">
                        {renderItems(currentMangaList, "DROPPED", openModal)}
                    </div>
                </div>
            </div>
        </>
    );
}
export default MangaList;
