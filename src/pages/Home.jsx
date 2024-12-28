import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import MediaGallery from "../components/HomePage/MediaGallery";
import AnimeUpcomingNextSeason from "../components/HomePage/AnimeUpcomingNextSeason";
import MyListSummary from "../components/HomePage/MyListSummary";
import "./Home.css";

function getSeasonAndYear() {
    const date = new Date();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    let season;
    let nextSeason;
    let nextSeasonYear = year;

    if (month >= 1 && month <= 3) {
        season = "WINTER"; // Enero, Febrero, Marzo
        nextSeason = "SPRING"; // Invierno ➡ Primavera
    } else if (month >= 4 && month <= 6) {
        season = "SPRING"; // Abril, Mayo, Junio
        nextSeason = "SUMMER"; // Primavera ➡ Verano
    } else if (month >= 7 && month <= 9) {
        season = "SUMMER"; // Julio, Agosto, Septiembre
        nextSeason = "FALL"; // Verano ➡ Otoño
    } else {
        season = "FALL"; // Octubre, Noviembre, Diciembre
        nextSeason = "WINTER"; // Otoño ➡ Invierno (cambia el año)
        nextSeasonYear += 1;
    }

    return { season, seasonYear: year, nextSeason, nextSeasonYear };
}

function Home() {
    const bannerImages = [
        "https://i.pinimg.com/originals/a1/62/e4/a162e4b44e2b2976a6e0b9ec2049cea5.jpg",
        "https://i.redd.it/zrjrv8639k561.jpg",
        "https://wallpapercave.com/wp/wp10891943.jpg",
        "https://wallpapercave.com/wp/wp10891944.jpg",
        "https://i.redd.it/lklft848moxa1.png",
        "https://wallpapercave.com/wp/wp8339914.jpg",
        "https://i.imgur.com/qAvWSrT.jpeg",
        "https://i.imgur.com/1CzsXnD.jpeg",
        "https://i.imgur.com/EwS3ILb.jpeg",
        "https://i.imgur.com/geNGqFT.jpeg",
        "https://i.imgur.com/sHjNF6L.jpeg",
    ];

    const { userData, isLoading } = useAuth();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const { theme } = useTheme();
    const [trendingMediaType, setTrendingMediaType] = useState("ANIME");
    const { season, seasonYear, nextSeason, nextSeasonYear } =
        getSeasonAndYear();
    useEffect(() => {
        // Cambiar imagen cada 5 segundos
        const interval = setInterval(() => {
            setCurrentImageIndex(
                (prevIndex) => (prevIndex + 1) % bannerImages.length
            );
        }, 5000);

        return () => clearInterval(interval);
    }, [bannerImages]);

    useEffect(() => {}, [trendingMediaType]);
    const handleTrendingMediaTypeChange = (newMediaType) => {
        setTrendingMediaType(newMediaType);
    };
    return (
        <>
            <header>
                {userData ? (
                    <Navbar userAvatar={userData.avatar.medium} />
                ) : (
                    <Navbar activeMenu="home" />
                )}
            </header>
            <main>
                <div id="home-menu">
                    <section id="main-banner">
                        <img
                            src={bannerImages[currentImageIndex]}
                            alt="Main Banner"
                        />
                        <div
                            // className={
                            //     theme == "light"
                            //         ? "banner-filter light"
                            //         : "banner-filter dark"
                            // }
                            className={"banner-filter dark"}
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
                    <AnimeUpcomingNextSeason
                        season={nextSeason}
                        seasonYear={nextSeasonYear}
                    />
                    <MyListSummary />
                </div>
            </main>
        </>
    );
}

export default Home;
