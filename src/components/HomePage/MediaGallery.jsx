import { useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_MEDIA_TRENDING_SEASON } from "../../graphql/queries";
import "./MediaGallery.css";
function MediaGallery({ type, sort, page, perPage, season, seasonYear }) {
    const navigate = useNavigate();

    const { data, loading, error } = useQuery(GET_MEDIA_TRENDING_SEASON, {
        variables: {
            type,
            sort,
            page,
            perPage,
            season,
            seasonYear,
        },
    });

    if (loading)
        return (
            <div className="media-gallery">
                <p>Loading...</p>;
            </div>
        );
    if (error)
        return (
            <div className="media-gallery">
                <p>Error: {error.message}</p>;
            </div>
        );

    const handleNavigate = (route) => {
        navigate(route);
    };
    return (
        <div className="media-gallery">
            {data.Page.media.map((mediaItem) => (
                <button
                    key={mediaItem.id}
                    className="media-item"
                    onClick={() =>
                        handleNavigate(`/${type.toLowerCase()}/${mediaItem.id}`)
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
                    <h3>{mediaItem.title.english || mediaItem.title.romaji}</h3>
                </button>
            ))}
        </div>
    );
}

export default MediaGallery;
