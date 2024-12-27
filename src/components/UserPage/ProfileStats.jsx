import "./ProfileStats.css";
function ProfileStats({ userStats }) {
    return (
        <>
            <h2>Stats</h2>
            <div className="anime-stats">
                <h3>Anime</h3>
                <p>Total Anime {userStats.anime.count}</p>
                <p>Episodes Watched {userStats.anime.episodesWatched}</p>
                <div className="genre-stats">
                    {userStats.anime.genres.map((genre) => (
                        <p key={genre.genre}>
                            {genre.genre}: {genre.count}
                        </p>
                    ))}
                </div>
            </div>
            <div className="manga-stats">
                <h3>Manga</h3>
                <p>Total Manga {userStats.manga.count}</p>
                <p>Chapters Read {userStats.manga.chaptersRead}</p>
                <div className="genre-stats">
                    {userStats.manga.genres.map((genre) => (
                        <p key={genre.genre}>
                            {genre.genre}: {genre.count}
                        </p>
                    ))}
                </div>
            </div>
        </>
    );
}
export default ProfileStats;
