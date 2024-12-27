import { Link } from "react-router-dom";
import { useState } from "react";
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
function Favourites({ favouritesList }) {
    const [animeFavourites, setAnimeFavourites] = useState(
        favouritesList.anime.nodes
    );
    const [mangaFavourites, setMangaFavourites] = useState(
        favouritesList.manga.nodes
    );

    const [modalVisible, setModalVisible] = useState(false);
    const [message, setMessage] = useState("");
    const handleRemoveFromFavourites = async (mediaId, type) => {
        const animeQuery = `
            mutation Mutation($animeId: Int) {
                ToggleFavourite(animeId: $animeId) {
                    anime {
                        nodes {
                            id
                            title {
                                english
                                romaji
                            }
                            coverImage {
                                large
                            }
                        }
                    }
                    manga {
                        nodes {
                            id
                            title {
                                english
                                romaji
                            }
                            coverImage {
                                large
                            }
                        }
                    }
                }
            }
        `;

        const mangaQuery = `
            mutation Mutation($mangaId: Int) {
                ToggleFavourite(mangaId: $mangaId) {
                    anime {
                        nodes {
                            id
                            title {
                                english
                                romaji
                            }
                            coverImage {
                                large
                            }
                        }
                    }
                    manga {
                        nodes {
                            id
                            title {
                                english
                                romaji
                            }
                            coverImage {
                                large
                            }
                        }
                    }
                }
            }
        `;
        let query;
        const token = localStorage.getItem("access_token");
        let variables = {};
        if (type === "ANIME") {
            query = animeQuery;
            variables = {
                animeId: mediaId,
            };
        } else {
            query = mangaQuery;
            variables = {
                mangaId: mediaId,
            };
        }

        try {
            const response = await fetch("https://graphql.anilist.co", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ query, variables }),
            });

            const data = await response.json();

            if (data.errors) {
                console.error("Error removing favourite:", data.errors);
                setMessage("Failed to remove from favourites");
            } else {
                setMessage("Removed from favourites");

                if (type === "ANIME") {
                    setAnimeFavourites((prev) =>
                        prev.filter((item) => item.id !== mediaId)
                    );
                } else if (type === "MANGA") {
                    setMangaFavourites((prev) =>
                        prev.filter((item) => item.id !== mediaId)
                    );
                }
            }

            // Mostrar modal temporalmente
            setModalVisible(true);
            setTimeout(() => {
                setModalVisible(false);
            }, 2000);
        } catch (error) {
            console.error("Error during removal:", error);
            setMessage("Error connecting to AniList");
            setModalVisible(true);
        }
    };

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
