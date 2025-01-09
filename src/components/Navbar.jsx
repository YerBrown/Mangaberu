import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import SearchBar from "./SearchBar";
import "./Navbar.css";

function Navbar({ activeMenu = "", userAvatar = null }) {
    const [navbarStyle, setNavbarStyle] = useState({
        backgroundColor: "rgba(0, 0, 0, 0)", // Inicialmente transparente
    });
    const [isLeftPartOpened, setIsLeftPartOpened] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollThreshold = 35; // Umbral en px para alcanzar opacidad completa
            const scrollPosition = window.scrollY;
            const opacity = Math.min(scrollPosition / scrollThreshold, 1); // Limita opacidad a 1 máximo
            setNavbarStyle({
                backgroundColor: `rgba(0,0,0, ${opacity})`,
            });
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const handleOpenOptions = () => {
        setIsLeftPartOpened(!isLeftPartOpened);
    };
    return (
        <nav>
            <div id="left-part" className={isLeftPartOpened ? "active" : ""}>
                <Link to="/" className={activeMenu === "home" ? "active" : ""}>
                    Home
                </Link>
                <Link
                    to="/anime"
                    className={activeMenu === "anime" ? "active" : ""}
                >
                    Anime
                </Link>
                <Link
                    to="/manga"
                    className={activeMenu === "manga" ? "active" : ""}
                >
                    Manga
                </Link>
                <Link
                    to="/media"
                    className={activeMenu === "media" ? "active" : ""}
                >
                    Find
                </Link>
            </div>
            <div id="left-part-button">
                <button onClick={() => handleOpenOptions()}>
                    <MenuRoundedIcon />
                </button>
            </div>
            <div id="central-part">
                <Link to="/">
                    <img
                        src="/src/assets/images/M-White.png"
                        alt="Dark Theme Logo"
                    />
                </Link>
            </div>
            <div id="right-part">
                <SearchBar />
                <Link to="/user">
                    {userAvatar ? (
                        <img src={userAvatar} alt="user avatar" />
                    ) : (
                        <AccountCircleIcon fontSize="large" />
                    )}
                </Link>
            </div>
        </nav>
    );
}
export default Navbar;
