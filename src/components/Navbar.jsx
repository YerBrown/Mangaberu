import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SearchBar from "./SearchBar";
import "./Navbar.css";
function Navbar() {
    const { theme } = useTheme();
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        // Detectar scroll para activar el color del nav
        const handleScroll = () => {
            const scrollThreshold = 40;
            setIsActive(window.scrollY > scrollThreshold);
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <nav className={isActive ? "active" : ""}>
            <div id="left-part">
                <Link to="/">Home</Link>
                <Link to="/anime">Anime</Link>
                <Link to="/manga">Manga</Link>
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
