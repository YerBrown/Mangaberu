import { createContext, useState, useEffect, useContext } from "react";
import {
    GET_USER_DATA,
    GET_USER_ANIME_LIST,
    GET_USER_MANGA_LIST,
} from "../graphql/queries";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);
    const [animeLists, setAnimeLists] = useState([]);
    const [mangaLists, setMangaLists] = useState([]);

    const [isLoading, setIsLoading] = useState(true);

    const token = localStorage.getItem("access_token");

    // Petición para obtener datos del usuario autenticado
    const fetchUserData = async (limit = 5, sort = "COUNT_DESC") => {
        if (!token) return;
        setIsLoading(true);
        const query = GET_USER_DATA;
        const variables = {
            limit: limit,
            sort: sort,
        };

        const response = await fetch("https://graphql.anilist.co", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                query: query.loc.source.body,
                variables: variables,
            }),
        });

        const data = await response.json();
        console.log(data);
        setUserData(data.data.Viewer);
        fetchUserMediaLists(data.data.Viewer.id);
    };

    // Obtener listas de anime/manga
    const fetchUserMediaLists = async (userId) => {
        const animeQuery = GET_USER_ANIME_LIST;

        const mangaQuery = GET_USER_MANGA_LIST;

        // Hacer ambas peticiones en paralelo
        const [animeResponse, mangaResponse] = await Promise.all([
            fetch("https://graphql.anilist.co", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    query: animeQuery.loc.source.body,
                    variables: { userId },
                }),
            }),
            fetch("https://graphql.anilist.co", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    query: mangaQuery.loc.source.body,
                    variables: { userId },
                }),
            }),
        ]);

        const animeData = await animeResponse.json();
        const mangaData = await mangaResponse.json();

        setAnimeLists(animeData.data.MediaListCollection.lists);
        setMangaLists(mangaData.data.MediaListCollection.lists);
        setIsLoading(false);
    };

    useEffect(() => {
        if (token) {
            fetchUserData(5);
        } else {
            setIsLoading(false);
        }
    }, [token]);

    return (
        <AuthContext.Provider
            value={{ userData, animeLists, mangaLists, isLoading }}
        >
            {children}
        </AuthContext.Provider>
    );
};

// Hook personalizado para usar el contexto
export const useAuth = () => {
    return useContext(AuthContext);
};
