import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Root.css";
function Root() {
    return (
        <>
            <Outlet />
            <footer>
                <Footer />
            </footer>
        </>
    );
}

export default Root;
