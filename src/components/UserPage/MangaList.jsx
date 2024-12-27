import EditRoundedIcon from "@mui/icons-material/EditRounded";

function MangaList({ mangaLists }) {
    return (
        <div className="user-manga-list">
            <h2>Manga List</h2>
            <div className="list-container">
                <div className="current">
                    <h3>Current</h3>
                    <div className="list-grid">
                        {mangaLists
                            .find((list) => list.status === "CURRENT")
                            .entries.map((entry) => (
                                <div
                                    key={entry.media.id}
                                    className="manga-item"
                                >
                                    <img
                                        src={entry.media.coverImage.large}
                                        alt={entry.media.title.english}
                                    />
                                    <button>
                                        <EditRoundedIcon />
                                    </button>
                                    <div className="progress-data">
                                        <h4>
                                            {entry.media.title.english
                                                ? entry.media.title.english
                                                : entry.media.title.romaji}
                                        </h4>
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
                </div>
                <div className="planning">
                    <h3>Planning</h3>
                    <div className="list-grid">
                        {mangaLists
                            .find((list) => list.status === "PLANNING")
                            .entries.map((entry) => (
                                <div
                                    key={entry.media.id}
                                    className="manga-item"
                                >
                                    <img
                                        src={entry.media.coverImage.large}
                                        alt={entry.media.title.english}
                                    />
                                    <button>
                                        <EditRoundedIcon />
                                    </button>
                                    <div className="progress-data">
                                        <h4>
                                            {entry.media.title.english
                                                ? entry.media.title.english
                                                : entry.media.title.romaji}
                                        </h4>
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
                </div>
                <div className="completed">
                    <h3>Completed</h3>
                    <div className="list-grid">
                        {mangaLists
                            .find((list) => list.status === "COMPLETED")
                            .entries.map((entry) => (
                                <div
                                    key={entry.media.id}
                                    className="manga-item"
                                >
                                    <img
                                        src={entry.media.coverImage.large}
                                        alt={entry.media.title.english}
                                    />
                                    <button>
                                        <EditRoundedIcon />
                                    </button>
                                    <div className="progress-data">
                                        <h4>
                                            {entry.media.title.english
                                                ? entry.media.title.english
                                                : entry.media.title.romaji}
                                        </h4>

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
                </div>
            </div>
        </div>
    );
}
export default MangaList;
