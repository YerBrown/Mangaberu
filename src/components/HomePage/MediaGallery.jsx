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

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const handleNavigate = (route) => {
        navigate(route);
    };
    return (
        <div className="media-gallery" onClick={() => {}}>
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
                            <p>{mediaItem.episodes} Episodes</p>
                        </div>
                    </div>
                    <h3>{mediaItem.title.english || mediaItem.title.romaji}</h3>
                </button>
            ))}
        </div>
    );
}

export default MediaGallery;
