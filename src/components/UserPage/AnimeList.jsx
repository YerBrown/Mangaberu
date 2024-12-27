import { Link } from "react-router-dom";
import { useModal } from "../../context/ModalContext";
import "./AnimeList.css";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
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
    return (
        <div className="user-anime-list">
            <h2>Anime List</h2>
            <div className="list-container">
                <div className="current">
                    {renderItems(animeLists, "CURRENT", openModal)}
                </div>
                <div className="planning">
                    {renderItems(animeLists, "PLANNING", openModal)}
                </div>
                <div className="completed">
                    {renderItems(animeLists, "COMPLETED", openModal)}
                </div>
                <div className="paused">
                    {renderItems(animeLists, "PAUSED", openModal)}
                </div>
                <div className="droped">
                    {renderItems(animeLists, "DROPPED", openModal)}
                </div>
            </div>
        </div>
    );
}
export default AnimeList;
