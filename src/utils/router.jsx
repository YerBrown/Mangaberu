import { createBrowserRouter } from "react-router-dom";
import Root from "../pages/Root";
import Home from "../pages/Home";
import About from "../pages/About";
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
                path: "about",
                element: <About />,
            },
            {
                path: "user",
                element: <User />,
            },
        ],
    },
]);
export default router;
