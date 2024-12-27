import { Link } from "react-router-dom";
import { useModal } from "../../context/ModalContext";
import EditRoundedIcon from "@mui/icons-material/EditRounded";

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
                        <button onClick={() => openEdit(entry)}>
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
    return (
        <div className="user-manga-list">
            <h2>Manga List</h2>
            <div className="list-container">
                <div className="current">
                    {renderItems(mangaLists, "CURRENT", openModal)}
                </div>
                <div className="planning">
                    {renderItems(mangaLists, "PLANNING", openModal)}
                </div>
                <div className="completed">
                    {renderItems(mangaLists, "COMPLETED", openModal)}
                </div>
                <div className="paused">
                    {renderItems(mangaLists, "PAUSED", openModal)}
                </div>
                <div className="droped">
                    {renderItems(mangaLists, "DROPPED", openModal)}
                </div>
            </div>
        </div>
    );
}
export default MangaList;
