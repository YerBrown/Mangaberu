import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DOMPurify from "dompurify";
import { useLazyQuery } from "@apollo/client";
import { GET_TOP_50_MEDIA } from "../../graphql/queries";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import StarRounded from "@mui/icons-material/StarRounded";
import EmojiEventsRoundedIcon from "@mui/icons-material/EmojiEventsRounded";

function TopPangaScore() {
    const [currentTopIndex, setCurrentTopIndex] = useState(0);
    const [fetchTop50, { data, loading, error }] = useLazyQuery(
        GET_TOP_50_MEDIA,
        {
            variables: {
                type: "MANGA",
            },
        }
    );

    const navigate = useNavigate();
    useEffect(() => {
        if (!data) {
            fetchTop50();
        }
    }, []);

    const handleSelectAnimeDirectly = (index) => {
        setCurrentTopIndex(index);
    };
    const handleNavigate = (animeId) => {
        navigate("/manga/" + animeId);
    };

    return (
        <section id="top-10-score-section">
            <h2>
                <EmojiEventsRoundedIcon fontSize="large" />
                Top 50 All Time
            </h2>
            <div className="top-10-container">
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>{error.message}</p>
                ) : data ? (
                    data.Page.media.map((manga, index) => (
                        <div
                            key={manga.id}
                            className={
                                index === currentTopIndex
                                    ? "anime-card active"
                                    : "anime-card"
                            }
                            onClick={() => handleSelectAnimeDirectly(index)}
                        >
                            {manga.bannerImage && (
                                <img
                                    src={manga.bannerImage}
                                    alt={
                                        (manga.title.english
                                            ? manga.title.english
                                            : manga.title.romaji) + "banner"
                                    }
                                    className="banner"
                                />
                            )}

                            <div className="anime-data">
                                <h4>{index + 1}</h4>
                                <p className="score">
                                    <StarRounded /> {manga.averageScore} %
                                </p>
                                <div className="content">
                                    <h3>
                                        {manga.title.english
                                            ? manga.title.english
                                            : manga.title.romaji}
                                    </h3>
                                    <div className="year-genres">
                                        <h4>{manga.startDate.year}</h4>
                                        <p>{manga.genres.join(", ")}</p>
                                    </div>
                                    <p
                                        className="description"
                                        dangerouslySetInnerHTML={{
                                            __html: DOMPurify.sanitize(
                                                manga.description
                                            ),
                                        }}
                                    ></p>
                                    <button
                                        onClick={() => handleNavigate(manga.id)}
                                    >
                                        More Info{" "}
                                        <InfoRoundedIcon fontSize="small" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : null}
            </div>
        </section>
    );
}
export default TopPangaScore;
