import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SearchBar from "./SearchBar";
import "./Navbar.css";
const getCSSVariable = (variableName) => {
    return getComputedStyle(document.documentElement).getPropertyValue(
        variableName
    );
};
const primaryColor = getCSSVariable("--primary-color");
function Navbar({ activeMenu = "" }) {
    const { theme } = useTheme();
    const [primaryColor, setPrimaryColor] = useState("");
    const [navbarStyle, setNavbarStyle] = useState({
        backgroundColor: "rgba(0, 0, 0, 0)", // Inicialmente transparente
    });

    useEffect(() => {
        const primaryColor = getCSSVariable("--primary-color");
        const rgbColor = hexToRgb(primaryColor); // Convierte hex a RGB si es necesario

        const handleScroll = () => {
            const scrollThreshold = 35; // Umbral en px para alcanzar opacidad completa
            const scrollPosition = window.scrollY;
            const opacity = Math.min(scrollPosition / scrollThreshold, 1); // Limita opacidad a 1 máximo
            setNavbarStyle({
                backgroundColor: `rgba(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}, ${opacity})`,
            });
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const hexToRgb = (hex) => {
        const bigint = parseInt(hex.replace("#", ""), 16);
        return {
            r: (bigint >> 16) & 255,
            g: (bigint >> 8) & 255,
            b: bigint & 255,
        };
    };

    return (
        <nav style={navbarStyle}>
            <div id="left-part">
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
            </div>
            <div id="central-part">
                <Link to="/">
                    {theme === "dark" ? (
                        <img
                            src="/src/assets/images/M-White.png"
                            alt="Dark Theme Logo"
                        />
                    ) : (
                        <img
                            src="/src/assets/images/M-Black.png"
                            alt="Light Theme Logo"
                        />
                    )}
                </Link>
            </div>
            <div id="right-part">
                <SearchBar />
                <Link to="/user">
                    <AccountCircleIcon fontSize="large" />
                </Link>
            </div>
        </nav>
    );
}
export default Navbar;
