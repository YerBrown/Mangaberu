import Navbar from "../components/Navbar";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import AnimeList from "../components/UserPage/AnimeList";
import MangaList from "../components/UserPage/MangaList";
import Favourites from "../components/UserPage/Favourites";
import LiveTvRoundedIcon from "@mui/icons-material/LiveTvRounded";
import AutoStoriesRoundedIcon from "@mui/icons-material/AutoStoriesRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import "./User.css";
function User() {
    const {
        userData,
        animeLists,
        mangaLists,
        favouritesLists,
        isLoading,
        refetchLists,
    } = useAuth();

    const { theme } = useTheme();
    const [selectedOption, setSelectedOption] = useState("animeList");

    const token = localStorage.getItem("access_token");

    const handleLogin = () => {
        const clientId = "23300";
        const redirectUri = "https://localhost:3000/auth-redirect";
        const authUrl = `https://anilist.co/api/v2/oauth/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}`;
        console.log("Redirigiendo a:", authUrl);
        window.location.href = authUrl;
    };

    const handleLogout = () => {
        localStorage.removeItem("access_token");
        window.location.href = "/";
    };
    const renderContent = () => {
        switch (selectedOption) {
            case "animeList":
                return <AnimeList animeLists={animeLists} />;
            case "mangaList":
                return <MangaList mangaLists={mangaLists} />;
            case "favorites":
                return (
                    <Favourites
                        favouritesList={favouritesLists}
                        fetchUserMediaLists={refetchLists}
                    />
                );
            default:
                return <AnimeList animeLists={animeLists} />;
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
                                    // className={
                                    //     theme == "light"
                                    //         ? "banner-filter light"
                                    //         : "banner-filter dark"
                                    // }
                                    className="banner-filter dark"
                                ></div>
                                <img
                                    className="avatar"
                                    src={userData.avatar.large}
                                    alt="User Avatar"
                                />
                                <h1 className="username">{userData.name}</h1>
                            </div>
                            <div className="user-options">
                                <button
                                    onClick={() =>
                                        setSelectedOption("animeList")
                                    }
                                    className={
                                        selectedOption === "animeList"
                                            ? "active"
                                            : ""
                                    }
                                >
                                    <LiveTvRoundedIcon fontSize="small" />
                                    Anime List
                                </button>
                                <button
                                    onClick={() =>
                                        setSelectedOption("mangaList")
                                    }
                                    className={
                                        selectedOption === "mangaList"
                                            ? "active"
                                            : ""
                                    }
                                >
                                    <AutoStoriesRoundedIcon fontSize="small" />
                                    Manga List
                                </button>
                                <button
                                    onClick={() =>
                                        setSelectedOption("favorites")
                                    }
                                    className={
                                        selectedOption === "favorites"
                                            ? "active"
                                            : ""
                                    }
                                >
                                    <FavoriteRoundedIcon fontSize="small" />
                                    Favourites
                                </button>
                                <a
                                    href="https://anilist.co/settings"
                                    target="_blank"
                                >
                                    <SettingsRoundedIcon fontSize="small" />
                                    AniList Settings
                                </a>
                                <button onClick={() => handleLogout()}>
                                    <LogoutRoundedIcon fontSize="small" />
                                    Logout
                                </button>
                            </div>
                            <div className="main-content">
                                {renderContent()}
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="sign-in-container">
                                <h1>Sign in to your AniList account</h1>
                                <button onClick={handleLogin}>
                                    Login with AniList
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </main>
        </>
    );
}

export default User;
