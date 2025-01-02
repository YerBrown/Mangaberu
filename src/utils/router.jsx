import { createBrowserRouter } from "react-router-dom";
import Root from "../pages/Root";
import Home from "../pages/Home";
import Anime from "../pages/Anime";
import AnimeDetails from "../pages/AnimeDetails";
import MangaDetails from "../pages/MangaDetails";
import Manga from "../pages/Manga";
import User from "../pages/User";
import AniListAuth from "./AniListAuth";
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
                path: "anime/:id_anime",
                element: <AnimeDetails />,
            },
            {
                path: "manga/:id_manga",
                element: <MangaDetails />,
            },
            {
                path: "manga",
                element: <Manga />,
            },
            {
                path: "user",
                element: <User />,
            },
            {
                path: "auth-redirect",
                element: <AniListAuth />,
            },
        ],
    },
]);
export default router;
