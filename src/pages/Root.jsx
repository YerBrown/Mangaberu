import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import EditListModal from "../components/EditListModal";
import "./Root.css";
function Root() {
    return (
        <>
            <EditListModal />
            <Outlet />
            <footer>
                <Footer />
            </footer>
        </>
    );
}

export default Root;
