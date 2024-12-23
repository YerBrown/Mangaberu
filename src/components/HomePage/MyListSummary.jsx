import "./MyListSummary.css";

function MyListSummary() {
    return (
        <section id="my-list-summary-section">
            <h2>My List Summary</h2>
            <div className="my-list-container">
                <div className="anime-in-progress">
                    <h3>Watching</h3>
                    <div className="anime-list-container">
                        <div className="list-item">
                            <img
                                src="https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx1535-4r88a1tsBEIz.jpg"
                                alt=""
                            />
                            <div className="extra-info">
                                <p>12/101</p>
                            </div>
                        </div>
                        <div className="list-item">
                            <img
                                src="https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx101922-WBsBl0ClmgYL.jpg"
                                alt=""
                            />
                            <div className="extra-info">
                                <p>12/101</p>
                            </div>
                        </div>
                        <div className="list-item">
                            <img
                                src="https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx16498-73IhOXpJZiMF.jpg"
                                alt=""
                            />
                            <div className="extra-info">
                                <p>12/101</p>
                            </div>
                        </div>
                        <div className="list-item">
                            <img
                                src="https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx113415-bbBWj4pEFseh.jpg"
                                alt=""
                            />
                            <div className="extra-info">
                                <p>12/101</p>
                            </div>
                        </div>
                        <div className="list-item">
                            <img
                                src="https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx1535-4r88a1tsBEIz.jpg"
                                alt=""
                            />
                            <div className="extra-info">
                                <p>12/101</p>
                            </div>
                        </div>
                        <div className="list-item">
                            <img
                                src="https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx101922-WBsBl0ClmgYL.jpg"
                                alt=""
                            />
                            <div className="extra-info">
                                <p>12/101</p>
                            </div>
                        </div>
                        <div className="list-item">
                            <img
                                src="https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx16498-73IhOXpJZiMF.jpg"
                                alt=""
                            />
                            <div className="extra-info">
                                <p>12/101</p>
                            </div>
                        </div>
                        <div className="list-item">
                            <img
                                src="https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx113415-bbBWj4pEFseh.jpg"
                                alt=""
                            />
                            <div className="extra-info">
                                <p>12/101</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="manga-in-progress">
                    <h3>Reading</h3>
                    <div className="manga-list-container">
                        <div className="list-item">
                            <img
                                src="https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx167834-QgyPJ7tOMGqA.png"
                                alt=""
                            />
                            <div className="extra-info">
                                <p>12/101</p>
                            </div>
                        </div>
                        <div className="list-item">
                            <img
                                src="https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx30013-ulXvn0lzWvsz.jpg"
                                alt=""
                            />
                            <div className="extra-info">
                                <p>12/101</p>
                            </div>
                        </div>
                        <div className="list-item">
                            <img
                                src="https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx175946-rx6eIfakvWYV.jpg"
                                alt=""
                            />
                            <div className="extra-info">
                                <p>12/101</p>
                            </div>
                        </div>
                        <div className="list-item">
                            <img
                                src="https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx132029-jIm1KsPcIwIl.jpg"
                                alt=""
                            />
                            <div className="extra-info">
                                <p>12/101</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="anime-planning">
                    <h3>Planning</h3>
                    <div className="anime-list-container"></div>
                </div>
                <div className="manga-planning">
                    <h3>Planning</h3>
                    <div className="manga-list-container"></div>
                </div>
            </div>
        </section>
    );
}

export default MyListSummary;
