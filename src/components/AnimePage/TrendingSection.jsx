import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_ANIME_TRENDING } from "../../graphql/queries";
import "./TrendingSection.css";
function TrendingSection() {
    const [currentTrendingIndex, setCurrentTrendingIndex] = useState(0);
    const { data, loading, error } = useQuery(GET_ANIME_TRENDING, {
        variables: {
            type: "ANIME",
            sort: "POPULARITY_DESC",
            page: 1,
            perPage: 5,
        },
    });

    const handleTrendingChange = (index) => {
        setCurrentTrendingIndex(index);
    };

    if (loading)
        return (
            <section id="trending-section">
                <p>Loading...</p>
            </section>
        );
    if (error)
        return (
            <section id="trending-section">
                <p>Error: {error.message}</p>;
            </section>
        );

    const currentBannerImage =
        data.Page.media[currentTrendingIndex].bannerImage ||
        data.Page.media[currentTrendingIndex].coverImage.extraLarge;
    return (
        <section id="trending-section">
            <img
                src={currentBannerImage}
                alt="banner-image"
                className="banner"
            />
            <div className="current-anime">
                <img
                    src={
                        data.Page.media[currentTrendingIndex].coverImage
                            .extraLarge
                    }
                    alt="current-anime-cover"
                />
                <div className="current-anime-data">
                    <h2>
                        {data.Page.media[currentTrendingIndex].title.english}
                    </h2>
                    <h3>
                        {data.Page.media[currentTrendingIndex].title.native}
                    </h3>
                    {data.Page.media[currentTrendingIndex].episodes !==
                        null && (
                        <p>
                            Episodes:{" "}
                            {data.Page.media[currentTrendingIndex].episodes}
                        </p>
                    )}
                </div>
            </div>
            <div className="top-5">
                {data.Page.media.map((mediaItem, index) => (
                    <div
                        key={mediaItem.id}
                        className={`trending-anime-item ${
                            currentTrendingIndex === index ? "active" : ""
                        }`}
                        onClick={() => handleTrendingChange(index)}
                    >
                        <img
                            src={
                                mediaItem.bannerImage ||
                                mediaItem.coverImage.medium
                            }
                            alt={
                                mediaItem.title.english ||
                                mediaItem.title.romaji
                            }
                        />
                        <div className="filter" />
                        <h3>
                            {mediaItem.title.english || mediaItem.title.romaji}
                        </h3>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default TrendingSection;
