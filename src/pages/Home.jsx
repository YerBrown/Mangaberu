import React, { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { useQuery, useLazyQuery } from "@apollo/client";
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
        "https://preview.redd.it/z4xusbtc58l71.jpg?width=7568&format=pjpg&auto=webp&s=e7675995626cc78d3882586fe93d4c5bf1ae5a83",
        "https://i.redd.it/lklft848moxa1.png",
        "https://wallpapercave.com/wp/wp8339914.jpg",
        "https://i.imgur.com/qAvWSrT.jpeg",
        "https://i.imgur.com/1CzsXnD.jpeg",
        "https://i.imgur.com/EwS3ILb.jpeg",
        "https://wallpapercave.com/wp/wp10891944.jpg",
        "https://i.imgur.com/geNGqFT.jpeg",
        "https://i.imgur.com/sHjNF6L.jpeg",
    ];

    const { userData, isLoading } = useAuth();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const { theme } = useTheme();

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

    return (
        <>
            <header>
                {userData ? (
                    <Navbar
                        userAvatar={userData.avatar.medium}
                        activeMenu="home"
                    />
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

                    <MediaGallery
                        sort={["TRENDING_DESC", "POPULARITY_DESC"]}
                        page={1}
                        perPage={6}
                        season={season}
                        seasonYear={seasonYear}
                    />

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
