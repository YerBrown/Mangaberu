import { createBrowserRouter } from "react-router-dom";
import Root from "../pages/Root";
import Home from "../pages/Home";
import Anime from "../pages/Anime";
import Manga from "../pages/Manga";
import User from "../pages/User";
// import ErrorPage from "./pages/ErrorPage";

// Definimos nuestras rutas
const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        // errorElement: <ErrorPage />,
        children: [
            {
                path: "",
                element: <Home />,
            },
            {
                path: "anime",
                element: <Anime />,
            },
            {
                path: "manga",
                element: <Manga />,
            },
            {
                path: "user",
                element: <User />,
            },
        ],
    },
]);
export default router;
