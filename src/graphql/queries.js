import { gql } from "@apollo/client";

export const GET_MEDIA_TRENDING_SEASON = gql`
    query Recommendation(
        $type: MediaType
        $sort: [MediaSort]
        $page: Int
        $perPage: Int
    ) {
        Page(page: $page, perPage: $perPage) {
            media(type: $type, sort: $sort) {
                id
                title {
                    english
                    romaji
                }
                type
                status
                genres
                episodes
                chapters
                startDate {
                    year
                }
                coverImage {
                    extraLarge
                }
            }
        }
    }
`;

export const GET_ANIME_UPCOMING_SEASON = gql`
    query Page(
        $page: Int
        $perPage: Int
        $type: MediaType
        $status: MediaStatus
        $season: MediaSeason
        $seasonYear: Int
        $sort: [MediaSort]
    ) {
        Page(page: $page, perPage: $perPage) {
            media(
                type: $type
                status: $status
                season: $season
                seasonYear: $seasonYear
                sort: $sort
            ) {
                id
                title {
                    english
                    romaji
                }
                coverImage {
                    extraLarge
                }
                trailer {
                    id
                }
                startDate {
                    day
                    month
                    year
                }
                genres
            }
        }
    }
`;

export const GET_MEDIA_TRENDING = gql`
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
                type
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
                isFavourite
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
                mediaListEntry {
                    id
                    progress
                    score
                    startedAt {
                        day
                        month
                        year
                    }
                    status
                }
            }
        }
    }
`;

export const GET_MEDIA_BY_ID = gql`
    query Media($mediaId: Int) {
        Media(id: $mediaId) {
            id
            title {
                english
                romaji
            }
            type
            description
            genres
            episodes
            chapters
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
            popularity
            favourites
            duration
            format
            studios {
                nodes {
                    name
                }
            }
            characters(page: 1, perPage: 6, sort: [ROLE, RELEVANCE, ID]) {
                nodes {
                    image {
                        large
                        medium
                    }
                    name {
                        full
                    }
                }
            }
            staff(page: 1, perPage: 1) {
                edges {
                    role
                    node {
                        image {
                            large
                        }
                        name {
                            full
                        }
                    }
                }
            }
            externalLinks {
                id
                color
                icon
                site
                url
                type
            }
            mediaListEntry {
                id
                progress
                score
                startedAt {
                    day
                    month
                    year
                }
                status
            }
        }
        Page(page: 1, perPage: 10) {
            recommendations(mediaId: $mediaId, sort: [RATING_DESC, ID]) {
                mediaRecommendation {
                    id
                    type
                    title {
                        english
                        romaji
                    }
                    coverImage {
                        extraLarge
                        large
                    }
                }
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
            pageInfo {
                currentPage
                hasNextPage
                total
                perPage
            }
        }
    }
`;

export const GET_USER_DATA = gql`
    query {
        Viewer {
            id
            name
            avatar {
                large
                medium
            }
            bannerImage
        }
    }
`;

export const GET_USER_ANIME_LIST = gql`
    query Query($userId: Int) {
        MediaListCollection(userId: $userId, type: ANIME) {
            lists {
                name
                status
                entries {
                    media {
                        type
                        id
                        title {
                            english
                            romaji
                        }
                        bannerImage
                        episodes
                        coverImage {
                            large
                            extraLarge
                        }
                        isFavourite
                    }
                    id
                    status
                    score
                    progress
                    startedAt {
                        day
                        month
                        year
                    }
                    completedAt {
                        day
                        month
                        year
                    }
                }
            }
        }
    }
`;

export const GET_USER_MANGA_LIST = gql`
    query Query($userId: Int) {
        MediaListCollection(userId: $userId, type: MANGA) {
            lists {
                name
                status
                entries {
                    media {
                        type
                        id
                        title {
                            english
                            romaji
                        }
                        bannerImage
                        chapters
                        coverImage {
                            large
                            extraLarge
                        }
                        isFavourite
                    }
                    id
                    status
                    score
                    progress
                    startedAt {
                        day
                        month
                        year
                    }
                    completedAt {
                        day
                        month
                        year
                    }
                }
            }
        }
    }
`;

export const GET_USER_FAVOURITES_LIST = gql`
    query {
        Viewer {
            favourites {
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
                    pageInfo {
                        currentPage
                        hasNextPage
                        total
                    }
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
    }
`;

export const GET_USER_LISTS = gql`
    query Query($userId: Int) {
        animeList: MediaListCollection(userId: $userId, type: ANIME) {
            lists {
                name
                status
                entries {
                    media {
                        type
                        id
                        title {
                            english
                            romaji
                        }
                        bannerImage
                        episodes
                        coverImage {
                            large
                            extraLarge
                        }
                        isFavourite
                    }
                    id
                    status
                    score
                    progress
                    startedAt {
                        day
                        month
                        year
                    }
                    completedAt {
                        day
                        month
                        year
                    }
                }
            }
        }
        mangaList: MediaListCollection(userId: $userId, type: MANGA) {
            lists {
                name
                status
                entries {
                    media {
                        type
                        id
                        title {
                            english
                            romaji
                        }
                        bannerImage
                        chapters
                        coverImage {
                            large
                            extraLarge
                        }
                        isFavourite
                    }
                    id
                    status
                    score
                    progress
                    startedAt {
                        day
                        month
                        year
                    }
                    completedAt {
                        day
                        month
                        year
                    }
                }
            }
        }
        Viewer {
            favourites {
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
                    pageInfo {
                        currentPage
                        hasNextPage
                        total
                    }
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
    }
`;

export const GET_MEDIA_BY_FILTER = gql`
    query Query(
        $page: Int
        $perPage: Int
        $type: MediaType
        $sort: [MediaSort]
        $startDateLike: String
        $genreIn: [String]
    ) {
        Page(page: $page, perPage: $perPage) {
            media(
                type: $type
                sort: $sort
                startDate_like: $startDateLike
                genre_in: $genreIn
            ) {
                id
                title {
                    english
                    romaji
                }
                bannerImage
                coverImage {
                    large
                    extraLarge
                }
                genres
                startDate {
                    year
                }
                isFavourite
                averageScore
                streamingEpisodes {
                    thumbnail
                    site
                    title
                }
                mediaListEntry {
                    id
                    progress
                    score
                    startedAt {
                        day
                        month
                        year
                    }
                    completedAt {
                        day
                        month
                        year
                    }
                    status
                }
            }
        }
    }
`;

export const GET_TOP_50_MEDIA = gql`
    query Media($type: MediaType) {
        Page(page: 1, perPage: 50) {
            media(sort: SCORE_DESC, type: $type) {
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
                chapters
                status
                description
                averageScore
                bannerImage
                coverImage {
                    extraLarge
                    large
                    medium
                }
                mediaListEntry {
                    id
                    progress
                    score
                    startedAt {
                        day
                        month
                        year
                    }
                    completedAt {
                        day
                        month
                        year
                    }
                    status
                }
            }
        }
    }
`;

export const GET_SEARCH = gql`
    query Query($page: Int, $perPage: Int, $search: String) {
        animes: Page(page: $page, perPage: $perPage) {
            media(search: $search, isAdult: false, type: ANIME) {
                id
                title {
                    english
                    romaji
                }
                format
                startDate {
                    year
                }
                coverImage {
                    large
                }
            }
        }
        mangas: Page(page: $page, perPage: $perPage) {
            media(search: $search, isAdult: false, type: MANGA) {
                id
                title {
                    english
                    romaji
                }
                format
                startDate {
                    year
                }
                coverImage {
                    large
                }
            }
        }
    }
`;

export const GET_MEDIA_BY_FILTER_SEARCH = gql`
    query Page(
        $page: Int
        $perPage: Int
        $type: MediaType
        $sort: [MediaSort]
        $search: String
        $genreIn: [String]
        $year: String
        $status: MediaStatus
        $formatIn: [MediaFormat]
        $licensedBy: [Int]
    ) {
        Page(page: $page, perPage: $perPage) {
            media(
                type: $type
                search: $search
                genre_in: $genreIn
                startDate_like: $year
                status: $status
                format_in: $formatIn
                licensedById_in: $licensedBy
                sort: $sort
            ) {
                id
                type
                mediaListEntry {
                    status
                }
                title {
                    english
                    romaji
                }
                coverImage {
                    extraLarge
                    large
                }
            }
            pageInfo {
                currentPage
                perPage
                hasNextPage
                total
            }
        }
    }
`;
