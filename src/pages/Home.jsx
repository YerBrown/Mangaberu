import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import { useTheme } from "../context/ThemeContext";
import MediaGallery from "../components/HomePage/MediaGallery";
import Navbar from "../components/Navbar";
import "./Home.css";

function getCurrentSeasonAndYear() {
    const date = new Date();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    let season;
    if (month >= 1 && month <= 3) {
        season = "WINTER"; // Enero, Febrero, Marzo
    } else if (month >= 4 && month <= 6) {
        season = "SPRING"; // Abril, Mayo, Junio
    } else if (month >= 7 && month <= 9) {
        season = "SUMMER"; // Julio, Agosto, Septiembre
    } else {
        season = "FALL"; // Octubre, Noviembre, Diciembre
    }

    return { season, seasonYear: year };
}
function Home() {
    // Array de URLs de imágenes
    const bannerImages = [
        "https://i.redd.it/lklft848moxa1.png",
        "https://wallpapers.com/images/hd/handsome-gojo-jujutsu-kaisen-manga-b0a89to1nqdkglfw.jpg",
        "https://wallpapercave.com/wp/wp8339914.jpg",
        "https://i.imgur.com/qAvWSrT.jpeg",
        "https://i.imgur.com/1CzsXnD.jpeg",
        "https://i.imgur.com/EwS3ILb.jpeg",
        "https://i.imgur.com/geNGqFT.jpeg",
        "https://i.imgur.com/sHjNF6L.jpeg",
    ];

    // Estado para la imagen actual
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const { theme } = useTheme();
    const [trendingMediaType, setTrendingMediaType] = useState("ANIME");
    const { season, seasonYear } = getCurrentSeasonAndYear();
    useEffect(() => {
        // Cambiar imagen cada 5 segundos
        const interval = setInterval(() => {
            setCurrentImageIndex(
                (prevIndex) => (prevIndex + 1) % bannerImages.length
            );
        }, 5000);

        // Limpiar el intervalo al desmontar
        return () => clearInterval(interval);
    }, [bannerImages]);

    useEffect(() => {}, [trendingMediaType]);
    const handleTrendingMediaTypeChange = (newMediaType) => {
        setTrendingMediaType(newMediaType);
    };
    return (
        <>
            <header>
                <Navbar activeMenu="home" />
            </header>
            <main>
                <div id="home-menu">
                    <section id="main-banner">
                        <img
                            src={bannerImages[currentImageIndex]}
                            alt="Main Banner"
                        />
                        <div
                            className={
                                theme == "light"
                                    ? "banner-filter light"
                                    : "banner-filter dark"
                            }
                        ></div>
                        <div id="banner-text">
                            <h2>Your next adventure begins here!</h2>
                            <p>
                                Keep a record of what you love and explore new
                                stories waiting for you
                            </p>
                        </div>
                    </section>
                    <section id="trending-this-season">
                        <div className="select-media-container">
                            <h2>Trending this seasson</h2>
                            <div>
                                <button
                                    onClick={() =>
                                        handleTrendingMediaTypeChange("ANIME")
                                    }
                                    className={
                                        trendingMediaType == "ANIME"
                                            ? "active"
                                            : ""
                                    }
                                >
                                    Anime
                                </button>
                                <button
                                    onClick={() =>
                                        handleTrendingMediaTypeChange("MANGA")
                                    }
                                    className={
                                        trendingMediaType == "MANGA"
                                            ? "active"
                                            : ""
                                    }
                                >
                                    Manga
                                </button>
                            </div>
                            <Link>View All</Link>
                        </div>
                        <MediaGallery
                            type={trendingMediaType}
                            sort={["TRENDING_DESC"]}
                            page={1}
                            perPage={5}
                            season={
                                trendingMediaType === "ANIME"
                                    ? season
                                    : undefined
                            }
                            seasonYear={
                                trendingMediaType === "ANIME"
                                    ? seasonYear
                                    : undefined
                            }
                        />
                    </section>
                </div>
            </main>
        </>
    );
}

export default Home;
