import { useQuery } from "@apollo/client";
import { GET_MEDIA_COVER_IMAGES } from "../../graphql/queries";

function MangaGallery({ type, sort, page, perPage }) {
    const { data, loading, error } = useQuery(GET_MEDIA_COVER_IMAGES, {
        variables: {
            type,
            sort,
            page,
            perPage,
        },
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className="media-gallery">
            {data.Page.media.map((mediaItem) => (
                <div key={mediaItem.id} className="media-item">
                    <img
                        src={mediaItem.coverImage.extraLarge}
                        alt={mediaItem.title.english || mediaItem.title.romaji}
                    />
                    <h3>{mediaItem.title.english || mediaItem.title.romaji}</h3>
                </div>
            ))}
        </div>
    );
}

export default MangaGallery;
