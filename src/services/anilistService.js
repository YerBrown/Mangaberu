// src/services/anilistService.js
const BASE_URL = "https://graphql.anilist.co";

// Fetch general
const fetchFromAniList = async (query, variables = {}) => {
    const token = localStorage.getItem("access_token");
    try {
        const response = await fetch(BASE_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ query, variables }),
        });

        const data = await response.json();
        if (data.errors) {
            console.error("AniList Error:", data.errors);
            throw new Error("Failed to fetch data");
        }
        return data;
    } catch (error) {
        console.error("Fetch error:", error);
        throw error;
    }
};

// Función para eliminar de favoritos
export const toggleFavourite = async (mediaId, type) => {
    const query = `
        mutation Mutation($id: Int) {
            ToggleFavourite(${type === "ANIME" ? "animeId" : "mangaId"}: $id) {
                anime {
                    nodes {
                        id
                        title {
                            english
                            romaji
                        }
                        coverImage {
                            large
                        }
                    }
                }
                manga {
                    nodes {
                        id
                        title {
                            english
                            romaji
                        }
                        coverImage {
                            large
                        }
                    }
                }
            }
        }
    `;

    const variables = { id: mediaId };
    return fetchFromAniList(query, variables);
};
