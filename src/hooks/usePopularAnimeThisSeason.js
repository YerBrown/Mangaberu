import { useLazyQuery } from "@apollo/client";
import { GET_ANIME_TRENDING } from "../graphql/queries";

// Obtener la temporada y el año actual
function getCurrentSeasonAndYear() {
    const date = new Date();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    let season;
    if (month >= 1 && month <= 3) {
        season = "WINTER";
    } else if (month >= 4 && month <= 6) {
        season = "SPRING";
    } else if (month >= 7 && month <= 9) {
        season = "SUMMER";
    } else {
        season = "FALL";
    }

    return { season, seasonYear: year };
}

// Hook personalizado
const usePopularAnimeThisSeason = (perPage = 5) => {
    const { season, seasonYear } = getCurrentSeasonAndYear();

    const [fetchAnime, { data, loading, error }] = useLazyQuery(
        GET_ANIME_TRENDING,
        {
            variables: {
                type: "ANIME",
                sort: "POPULARITY_DESC",
                page: 1,
                perPage,
                season,
                seasonYear,
            },
        }
    );

    const fetchOnMount = () => {
        fetchAnime();
    };
    return { data, loading, error, fetchOnMount };
};

export default usePopularAnimeThisSeason;
