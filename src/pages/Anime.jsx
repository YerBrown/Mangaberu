import Navbar from "../components/Navbar";
import TrendingSection from "../components/AnimePage/TrendingSection";
import AnimeTop10FilterSection from "../components/AnimePage/AnimeTop10FilterSection";
import "./Anime.css";
function Anime() {
    return (
        <>
            <header>
                <Navbar activeMenu="anime" />
            </header>
            <main>
                <div id="anime-menu">
                    <TrendingSection />
                    <AnimeTop10FilterSection />
                </div>
            </main>
        </>
    );
}

export default Anime;
