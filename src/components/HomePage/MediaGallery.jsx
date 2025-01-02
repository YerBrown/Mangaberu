import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_MEDIA_TRENDING_SEASON } from "../../graphql/queries";
import "./MediaGallery.css";

function MediaGallery({ sort, page, perPage, season, seasonYear }) {
    const navigate = useNavigate();
    const [trendingMediaType, setTrendingMediaType] = useState("ANIME");
    const [trendingMedia, setTrendingMedia] = useState([]);

    // Almacenar datos de anime/manga localmente
    const [animeList, setAnimeList] = useState(null);
    const [mangaList, setMangaList] = useState(null);

    // Lazy Queries para obtener anime y manga
    const [fetchAnime, { data: animeData, loading: animeLoading }] =
        useLazyQuery(GET_MEDIA_TRENDING_SEASON, {
            variables: {
                type: "ANIME",
                sort,
                page,
                perPage,
            },
        });

    const [fetchManga, { data: mangaData, loading: mangaLoading }] =
        useLazyQuery(GET_MEDIA_TRENDING_SEASON, {
            variables: {
                type: "MANGA",
                sort,
                page,
                perPage,
            },
        });

    // Función para manejar navegación
    const handleNavigate = (route) => {
        navigate(route);
    };

    // Función para cambiar entre anime/manga
    const handleTrendingMediaTypeChange = (type) => {
        setTrendingMediaType(type);

        if (type === "ANIME") {
            if (animeList) {
                setTrendingMedia(animeList);
            }
        } else {
            if (mangaList) {
                setTrendingMedia(mangaList);
            }
        }
    };

    // Fetch inicial al montar el componente
    useEffect(() => {
        if (!animeList) fetchAnime();
    }, [fetchAnime]);
    useEffect(() => {
        if (!mangaList) fetchManga();
    }, [fetchManga]);

    // Guardar datos en estado cuando se completan las peticiones
    useEffect(() => {
        if (animeData) {
            setAnimeList(animeData.Page.media);
            if (trendingMediaType === "ANIME") {
                setTrendingMedia(animeData.Page.media);
            }
        }
        if (mangaData) {
            setMangaList(mangaData.Page.media);
            if (trendingMediaType === "MANGA") {
                setTrendingMedia(mangaData.Page.media);
            }
        }
    }, [animeData, mangaData]);

    return (
        <section id="trending-this-season">
            <div className="select-media-container">
                <h2>Trending this season</h2>
                <div>
                    <button
                        onClick={() => handleTrendingMediaTypeChange("ANIME")}
                        className={
                            trendingMediaType === "ANIME" ? "active" : ""
                        }
                    >
                        Anime
                    </button>
                    <button
                        onClick={() => handleTrendingMediaTypeChange("MANGA")}
                        className={
                            trendingMediaType === "MANGA" ? "active" : ""
                        }
                    >
                        Manga
                    </button>
                </div>
                <Link to="/trending">View All</Link>
            </div>

            <div className="media-gallery">
                {animeLoading || mangaLoading ? (
                    <p>Loading...</p>
                ) : trendingMedia.length > 0 ? (
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
                                                : "Unknown episodes"
                                            : mediaItem.chapters
                                            ? `${mediaItem.chapters} chapters`
                                            : "Unknown chapters"}
                                    </p>
                                </div>
                            </div>
                            <h3>
                                {mediaItem.title.english ||
                                    mediaItem.title.romaji}
                            </h3>
                        </button>
                    ))
                ) : (
                    <p>No trending media found</p>
                )}
            </div>
        </section>
    );
}

export default MediaGallery;
