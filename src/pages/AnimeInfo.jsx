import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";

import "./Home.css";
// Define la consulta GraphQL
const GET_MEDIA = gql`
    query ($id: Int) {
        Media(id: $id) {
            id
            title {
                romaji
                english
                native
            }
            coverImage {
                extraLarge
            }
            bannerImage
        }
    }
`;

function AnimeInfo() {
    // Realiza la consulta con la variable `id`
    const { loading, error, data } = useQuery(GET_MEDIA, {
        variables: { id: 1 }, // Cambia este ID según lo necesario
    });
    // Muestra un indicador de carga mientras se obtienen los datos
    if (loading) return <p>Loading...</p>;

    // Muestra un mensaje de error si ocurre algo
    if (error) {
        const graphQLErrors = error.graphQLErrors
            ? error.graphQLErrors.map((err) => err.message).join(", ")
            : null;
        const networkError = error.networkError
            ? error.networkError.message
            : null;

        return (
            <p>
                Error:{" "}
                {graphQLErrors || networkError || "An unknown error occurred"}
            </p>
        );
    }

    return (
        <div id="home-menu">
            <h1>Home</h1>
            <h2>Media Information</h2>
            <p>ID: {data.Media.id}</p>
            <p>Romaji: {data.Media.title.romaji}</p>
            <p>English: {data.Media.title.english || "N/A"}</p>
            <p>Native: {data.Media.title.native}</p>
            <img
                src={data.Media.coverImage.extraLarge}
                alt="cover_image"
                className="cover"
            />
            <img
                src={data.Media.bannerImage}
                alt="banner_image"
                className="banner"
            />
        </div>
    );
}

export default AnimeInfo;
