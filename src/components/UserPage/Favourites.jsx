import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { toggleFavourite } from "../../services/anilistService";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import HeartBrokenRoundedIcon from "@mui/icons-material/HeartBrokenRounded";
import "./Favourites.css";
const renderItems = (mediaList, type, handleRemove) => {
    return mediaList.map((media) => (
        <div key={media.id} className="favourite-item">
            <img
                src={media.coverImage.large}
                alt={media.title.english || media.title.romaji}
            />
            <button onClick={() => handleRemove(media.id, type)}>
                <HeartBrokenRoundedIcon />
            </button>
            <div className="data">
                <Link
                    to={
                        type === "MANGA"
                            ? `/manga/${media.id}`
                            : `/anime/${media.id}`
                    }
                >
                    <h4>
                        {media.title.english
                            ? media.title.english
                            : media.title.romaji}
                    </h4>
                </Link>
            </div>
        </div>
    ));
};
function Favourites({ favouritesList, fetchUserMediaLists }) {
    const [animeFavourites, setAnimeFavourites] = useState(
        favouritesList.anime.nodes
    );
    const [mangaFavourites, setMangaFavourites] = useState(
        favouritesList.manga.nodes
    );

    const [modalVisible, setModalVisible] = useState(false);
    const [message, setMessage] = useState("");
    const handleRemoveFromFavourites = async (mediaId, type) => {
        try {
            const data = await toggleFavourite(mediaId, type);
            setMessage("Removed from favourites");
            fetchUserMediaLists();

            if (type === "ANIME") {
                setAnimeFavourites((prev) =>
                    prev.filter((item) => item.id !== mediaId)
                );
            } else if (type === "MANGA") {
                setMangaFavourites((prev) =>
                    prev.filter((item) => item.id !== mediaId)
                );
            }
        } catch (error) {
            setMessage("Error connecting to AniList");
        }

        setModalVisible(true);
        setTimeout(() => {
            setModalVisible(false);
        }, 2000);
    };
    useEffect(() => {
        setAnimeFavourites(favouritesList.anime.nodes);
        setMangaFavourites(favouritesList.manga.nodes);
    }, [favouritesList]);

    return (
        <>
            {modalVisible && (
                <div className="modal">
                    <p>{message}</p>
                </div>
            )}
            <div className="favourites-list">
                <h2>Favourites</h2>
                <h3>Anime</h3>
                <div className="anime-favourites-container">
                    {renderItems(
                        animeFavourites,
                        "ANIME",
                        handleRemoveFromFavourites
                    )}
                </div>
                <h3>Manga</h3>
                <div className="manga-favourites-container">
                    {renderItems(
                        mangaFavourites,
                        "MANGA",
                        handleRemoveFromFavourites
                    )}
                </div>
            </div>
        </>
    );
}
export default Favourites;
