import { useState, useEffect } from "react";
import { useQuery, useLazyQuery } from "@apollo/client";
import { GET_MEDIA_TRENDING_SEASON } from "../graphql/queries";

const useTrendingMedia = (sort, page, perPage, season, seasonYear) => {
    const [trendingMediaType, setTrendingMediaType] = useState("ANIME");
    const [trendingData, setTrendingData] = useState({
        anime: [],
        manga: [],
    });

    // Consulta para ANIME
    const [
        fetchAnime,
        { data: animeData, loading: animeLoading, error: animeError },
    ] = useLazyQuery(GET_MEDIA_TRENDING_SEASON, {
        variables: {
            type: "ANIME",
            sort,
            page,
            perPage,
            season,
            seasonYear,
        },
    });

    // Consulta para MANGA
    const [
        fetchManga,
        { data: mangaData, loading: mangaLoading, error: mangaError },
    ] = useLazyQuery(GET_MEDIA_TRENDING_SEASON, {
        variables: {
            type: "MANGA",
            sort,
            page,
            perPage,
        },
    });

    // Actualiza trendingData cuando llegan los datos
    useEffect(() => {
        if (animeData) {
            setTrendingData((prev) => ({
                ...prev,
                anime: animeData.Page.media,
            }));
        }
        if (mangaData) {
            setTrendingData((prev) => ({
                ...prev,
                manga: mangaData.Page.media,
            }));
        }
    }, [animeData, mangaData]);

    // Cambiar el tipo de media (ANIME/MANGA)
    const handleTrendingMediaTypeChange = (type) => {
        setTrendingMediaType(type);
    };
    const fetchOnMount = () => {
        fetchAnime();
        fetchManga();
    };
    // Devolver datos y funciones útiles al componente que use este hook
    return {
        trendingMediaType,
        trendingData,
        handleTrendingMediaTypeChange,
        trendingMedia:
            trendingMediaType === "ANIME"
                ? trendingData.anime
                : trendingData.manga,
        loading: animeLoading || mangaLoading,
        error: animeError || mangaError,
        fetchOnMount,
    };
};

export default useTrendingMedia;
