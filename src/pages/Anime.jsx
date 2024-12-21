import Navbar from "../components/Navbar";
import TrendingSection from "../components/AnimePage/TrendingSection";
// import TrendingSection2 from "../components/AnimePage/TrendingSection2";
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
                </div>
            </main>
        </>
    );
}

export default Anime;
