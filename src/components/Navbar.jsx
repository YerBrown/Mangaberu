import { Link } from "react-router-dom";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import "./Navbar.css";
function Navbar() {
    return (
        <nav>
            <div id="left-part">
                <Link to="/">Inicio</Link>
                <Link to="/about">Sobre Nosotros</Link>
            </div>
            <div id="central-part">
                <Link to="/">
                    <img src="/src/assets/images/letra-m.png" alt="" />
                </Link>
            </div>
            <div id="right-part">
                <Link to="/user">
                    <AccountCircleIcon />
                </Link>
            </div>
        </nav>
    );
}
export default Navbar;
