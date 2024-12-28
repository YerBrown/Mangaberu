import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./MyListSummary.css";

const renderItems = (mediaList, status, redirectMoreInfo = null) => {
    const list = mediaList.find((list) => list.status === status);
    if (!list) return null;
    return (
        <>
            {list.entries.map((entry) => (
                <button
                    key={entry.media.id}
                    className="list-item"
                    onClick={() => redirectMoreInfo(entry.media.id)}
                >
                    <img
                        src={entry.media.coverImage.large}
                        alt={
                            entry.media.title.english ||
                            entry.media.title.romaji
                        }
                    />
                    <div className="extra-info">
                        <p>
                            {entry.media.chapters
                                ? `${entry.progress}/${entry.media.chapters}`
                                : entry.media.episodes
                                ? `${entry.progress}/${entry.media.episodes}`
                                : entry.progress}
                        </p>
                    </div>
                </button>
            ))}
        </>
    );
};
function MyListSummary() {
    const { userData, animeLists, mangaLists, favouritesLists, isLoading } =
        useAuth();
    const navigate = useNavigate();
    const handleNavigateAnime = (animeId) => {
        navigate("/anime/" + animeId);
    };
    const handleNavigateManga = (mangaId) => {
        navigate("/manga/" + mangaId);
    };
    return (
        <>
            {isLoading ? (
                <p>Loading...</p>
            ) : userData ? (
                <section id="my-list-summary-section">
                    <h2>My List Summary</h2>
                    <div className="my-list-container">
                        <div className="anime-in-progress">
                            <h3>Watching</h3>
                            <div className="anime-list-container">
                                {renderItems(
                                    animeLists,
                                    "CURRENT",
                                    handleNavigateAnime
                                )}
                            </div>
                        </div>
                        <div className="manga-in-progress">
                            <h3>Reading</h3>
                            <div className="manga-list-container">
                                {renderItems(
                                    mangaLists,
                                    "CURRENT",
                                    handleNavigateManga
                                )}
                            </div>
                        </div>
                        <div className="anime-planning">
                            <h3>Planning</h3>
                            <div className="anime-list-container">
                                {renderItems(
                                    animeLists,
                                    "PLANNING",
                                    handleNavigateAnime
                                )}
                            </div>
                        </div>
                        <div className="manga-planning">
                            <h3>Planning</h3>
                            <div className="manga-list-container">
                                {renderItems(
                                    mangaLists,
                                    "PLANNING",
                                    handleNavigateManga
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            ) : (
                <></>
            )}
        </>
    );
}

export default MyListSummary;
