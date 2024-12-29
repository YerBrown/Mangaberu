import { Link, useNavigate } from "react-router-dom";
import useTrendingMedia from "../../hooks/useTrendingMedia";
import "./MediaGallery.css";
function MediaGallery({ sort, page, perPage, season, seasonYear }) {
    const navigate = useNavigate();

    const {
        trendingMediaType,
        trendingMedia,
        handleTrendingMediaTypeChange,
        loading,
        error,
    } = useTrendingMedia(sort, page, perPage, season, seasonYear);

    const handleNavigate = (route) => {
        navigate(route);
    };
    return (
        <section id="trending-this-season">
            <div className="select-media-container">
                <h2>Trending this seasson</h2>
                <div>
                    <button
                        onClick={() => handleTrendingMediaTypeChange("ANIME")}
                        className={trendingMediaType == "ANIME" ? "active" : ""}
                    >
                        Anime
                    </button>
                    <button
                        onClick={() => handleTrendingMediaTypeChange("MANGA")}
                        className={trendingMediaType == "MANGA" ? "active" : ""}
                    >
                        Manga
                    </button>
                </div>
                <Link>View All</Link>
            </div>
            <div className="media-gallery">
                {loading && <p>Loading...</p>}
                {error && <p>Error: {error.message}</p>}
                {trendingMedia.length > 0 &&
                    trendingMedia.map((mediaItem) => (
                        <button
                            key={mediaItem.id}
                            className="media-item"
                            onClick={() =>
                                handleNavigate(
                                    `/${trendingMediaType.toLowerCase()}/${
                                        mediaItem.id
                                    }`
                                )
                            }
                        >
                            <div className="top-part">
                                <img
                                    src={mediaItem.coverImage.extraLarge}
                                    alt={
                                        mediaItem.title.english ||
                                        mediaItem.title.romaji
                                    }
                                />
                                <div className="more-info">
                                    <p>Genres: {mediaItem.genres.join(", ")}</p>

                                    <p>
                                        {mediaItem.type === "ANIME"
                                            ? mediaItem.episodes
                                                ? `${mediaItem.episodes} episodes`
                                                : ""
                                            : mediaItem.chapters
                                            ? `${mediaItem.chapters} chapters`
                                            : ""}
                                    </p>
                                </div>
                            </div>
                            <h3>
                                {mediaItem.title.english ||
                                    mediaItem.title.romaji}
                            </h3>
                        </button>
                    ))}
            </div>
        </section>
    );
}

export default MediaGallery;
