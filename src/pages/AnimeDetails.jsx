import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import DOMPurify from "dompurify";
import { GET_ANIME_BY_ID } from "../graphql/queries";
import Navbar from "../components/Navbar";

import "./AnimeDetails.css";
function AnimeDetails() {
    const { id_anime } = useParams();
    const { data, loading, error } = useQuery(GET_ANIME_BY_ID, {
        variables: {
            mediaId: id_anime,
        },
    });

    if (loading)
        return (
            <div id="anime-details-menu">
                <p>Loading...</p>
            </div>
        );
    if (error)
        return (
            <div id="anime-details-menu">
                <p>Error: {error.message}</p>;
            </div>
        );

    const sanitizedDescriptionHTML = DOMPurify.sanitize(data.Media.description);
    return (
        <>
            <header>
                <Navbar />
            </header>
            <main>
                <div id="anime-details-menu">
                    <img
                        src={data.Media.bannerImage}
                        alt={data.Media.title.romaji}
                        className="banner"
                    />
                    <div className="main-container">
                        <h1>
                            {data.Media.title.romaji ||
                                data.Media.title.english}
                        </h1>
                        <img
                            src={data.Media.coverImage.large}
                            alt={data.Media.title.romaji}
                        />
                        <p>
                            <strong>Episodes:</strong>{" "}
                            {data.Media.episodes || "N/A"}
                        </p>
                        <p>
                            <strong>Genres:</strong>{" "}
                            {data.Media.genres.join(", ")}
                        </p>
                        <p
                            dangerouslySetInnerHTML={{
                                __html: sanitizedDescriptionHTML,
                            }}
                        ></p>
                    </div>
                </div>
            </main>
        </>
    );
}

export default AnimeDetails;
