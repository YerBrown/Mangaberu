import React, { useState, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import { useTheme } from "../context/ThemeContext";
import MangaGallery from "../components/HomePage/MangaGallery";
import Navbar from "../components/Navbar";
import "./Home.css";
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
                    <section id="trending-manga">
                        <MangaGallery
                            type={"MANGA"}
                            sort={["TRENDING_DESC"]}
                            page={1}
                            perPage={5}
                        />
                    </section>
                </div>
            </main>
        </>
    );
}

export default Home;
