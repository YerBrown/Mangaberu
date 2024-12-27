import Navbar from "../components/Navbar";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

import ProfileStats from "../components/UserPage/ProfileStats";
import AnimeList from "../components/UserPage/AnimeList";
import MangaList from "../components/UserPage/MangaList";
import Favourites from "../components/UserPage/Favourites";

import "./User.css";
function User() {
    const { userData, animeLists, mangaLists, isLoading } = useAuth();

    const { theme } = useTheme();
    const [selectedOption, setSelectedOption] = useState("profileStats");

    const CLIENT_ID = "23265";

    const token = localStorage.getItem("access_token");

    const handleLogin = () => {
        window.location.href = `https://anilist.co/api/v2/oauth/authorize?client_id=${CLIENT_ID}&response_type=token&redirect_uri=http://localhost:3000/user`;
    };

    const renderContent = () => {
        switch (selectedOption) {
            case "profileStats":
                return <ProfileStats userStats={userData.statistics} />;
            case "animeList":
                return <AnimeList animeLists={animeLists} />;
            case "mangaList":
                return <MangaList mangaLists={mangaLists} />;
            case "favorites":
                return <Favourites />;
            default:
                return <ProfileStats />;
        }
    };

    return (
        <>
            <header>
                {userData ? (
                    <Navbar userAvatar={userData.avatar.medium} />
                ) : (
                    <Navbar />
                )}
            </header>
            <main>
                <div className="user-menu">
                    {isLoading ? (
                        <h1>Loading...</h1>
                    ) : userData ? (
                        <>
                            <div className="user-info">
                                <img
                                    className="banner"
                                    src={userData.bannerImage}
                                    alt="user banner"
                                />
                                <div
                                    className={
                                        theme == "light"
                                            ? "banner-filter light"
                                            : "banner-filter dark"
                                    }
                                ></div>
                                <img
                                    className="avatar"
                                    src={userData.avatar.large}
                                    alt="User Avatar"
                                />
                                <h1 className="username">{userData.name}</h1>
                            </div>
                            <div className="main-content">
                                <div className="user-options">
                                    <button
                                        onClick={() =>
                                            setSelectedOption("animeList")
                                        }
                                    >
                                        Anime List
                                    </button>
                                    <button
                                        onClick={() =>
                                            setSelectedOption("mangaList")
                                        }
                                    >
                                        Manga List
                                    </button>
                                    <button
                                        onClick={() =>
                                            setSelectedOption("favorites")
                                        }
                                    >
                                        Favorites
                                    </button>
                                    <button
                                        onClick={() =>
                                            setSelectedOption("profileStats")
                                        }
                                    >
                                        Stats
                                    </button>
                                </div>
                                <div className="current-option">
                                    {renderContent()}
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <button onClick={handleLogin}>
                                Login with AniList
                            </button>
                        </>
                    )}
                </div>
            </main>
        </>
    );
}

export default User;
