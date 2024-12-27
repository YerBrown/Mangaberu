import { gql } from "@apollo/client";
export const TOGGLE_FAVOURITE_ANIME = gql`
    mutation ($mediaId: Int!) {
        ToggleFavourite(mediaId: $mediaId) {
            anime {
                nodes {
                    id
                    title {
                        romaji
                        english
                    }
                }
            }
            manga {
                nodes {
                    id
                    title {
                        romaji
                        english
                    }
                }
            }
        }
    }
`;
