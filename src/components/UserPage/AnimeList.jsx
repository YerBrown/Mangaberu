import "./AnimeList.css";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
function AnimeList({ animeLists }) {
    return (
        <div className="user-anime-list">
            <h2>Anime List</h2>
            <div className="list-container">
                <div className="current">
                    <h3>Current</h3>
                    <div className="list-grid">
                        {animeLists
                            .find((list) => list.status === "CURRENT")
                            .entries.map((entry) => (
                                <div
                                    key={entry.media.id}
                                    className="anime-item"
                                >
                                    <img
                                        src={entry.media.coverImage.large}
                                        alt={entry.media.title.english}
                                    />
                                    <button>
                                        <EditRoundedIcon />
                                    </button>
                                    <div className="progress-data">
                                        <h4>{entry.media.title.english}</h4>
                                        <p>
                                            Episodes:{" "}
                                            {entry.media.episodes
                                                ? `${entry.progress}/${entry.media.episodes}`
                                                : entry.progress}
                                        </p>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
                <div className="planning">
                    <h3>Planning</h3>
                    <div className="list-grid">
                        {animeLists
                            .find((list) => list.status === "PLANNING")
                            .entries.map((entry) => (
                                <div
                                    key={entry.media.id}
                                    className="anime-item"
                                >
                                    <img
                                        src={entry.media.coverImage.large}
                                        alt={entry.media.title.english}
                                    />
                                    <button>
                                        <EditRoundedIcon />
                                    </button>
                                    <div className="progress-data">
                                        <h4>{entry.media.title.english}</h4>
                                        <p>
                                            Episodes:{" "}
                                            {entry.media.episodes
                                                ? `${entry.progress}/${entry.media.episodes}`
                                                : entry.progress}
                                        </p>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
                <div className="completed">
                    <h3>Completed</h3>
                    <div className="list-grid">
                        {animeLists
                            .find((list) => list.status === "COMPLETED")
                            .entries.map((entry) => (
                                <div
                                    key={entry.media.id}
                                    className="anime-item"
                                >
                                    <img
                                        src={entry.media.coverImage.large}
                                        alt={entry.media.title.english}
                                    />
                                    <button>
                                        <EditRoundedIcon />
                                    </button>
                                    <div className="progress-data">
                                        <h4>{entry.media.title.english}</h4>

                                        <p>
                                            Episodes:{" "}
                                            {entry.media.episodes
                                                ? `${entry.progress}/${entry.media.episodes}`
                                                : entry.progress}
                                        </p>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
export default AnimeList;
