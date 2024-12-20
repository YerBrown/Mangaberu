import { gql } from "@apollo/client";

export const GET_MEDIA_COVER_IMAGES = gql`
    query ($type: MediaType, $sort: [MediaSort], $page: Int, $perPage: Int) {
        Page(page: $page, perPage: $perPage) {
            media(type: $type, sort: $sort) {
                id
                chapters
                coverImage {
                    extraLarge
                }
                title {
                    english
                    native
                    romaji
                }
            }
        }
    }
`;

export const GET_ANIME_TRENDING = gql`
    query ($type: MediaType, $sort: [MediaSort], $page: Int, $perPage: Int) {
        Page(page: $page, perPage: $perPage) {
            media(type: $type, sort: $sort) {
                id
                title {
                    english
                    native
                    romaji
                }
                episodes
                genres
                status
                description
                coverImage {
                    extraLarge
                    large
                    medium
                }
                bannerImage
                trailer {
                    id
                    site
                    thumbnail
                }
            }
        }
    }
`;
