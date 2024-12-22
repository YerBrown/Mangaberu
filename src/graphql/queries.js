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
    query (
        $type: MediaType
        $sort: [MediaSort]
        $page: Int
        $perPage: Int
        $season: MediaSeason
        $seasonYear: Int
    ) {
        Page(page: $page, perPage: $perPage) {
            media(
                type: $type
                sort: $sort
                season: $season
                seasonYear: $seasonYear
            ) {
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
                averageScore
                startDate {
                    year
                }
            }
        }
    }
`;

export const GET_ANIME_BY_ID = gql`
    query Media($mediaId: Int) {
        Media(id: $mediaId) {
            id
            title {
                english
                romaji
            }
            genres
            episodes
            averageScore
            coverImage {
                extraLarge
                large
                medium
            }
            bannerImage
            externalLinks {
                color
                icon
                site
                url
                type
            }
            isFavourite
            trailer {
                id
                site
                thumbnail
            }
            status
            startDate {
                day
                month
                year
            }
            endDate {
                day
                month
                year
            }
        }
    }
`;

export const GET_GENRES = gql`
    query Media {
        GenreCollection
    }
`;

export const GET_TOP_10_SORT_GENRE = gql`
    query Media(
        $page: Int
        $perPage: Int
        $genreIn: [String]
        $sort: [MediaSort]
        $type: MediaType
    ) {
        Page(page: $page, perPage: $perPage) {
            media(genre_in: $genreIn, sort: $sort, type: $type) {
                id
                title {
                    english
                    romaji
                }
                startDate {
                    year
                }
                genres
                episodes
                status
                averageScore
                coverImage {
                    extraLarge
                    large
                    medium
                }
            }
        }
    }
`;
