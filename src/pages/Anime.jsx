import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import TrendingSection from "../components/AnimePage/TrendingSection";
import AnimeTop10FilterSection from "../components/AnimePage/AnimeTop10FilterSection";
import "./Anime.css";
function Anime() {
    const { userData, isLoading } = useAuth();
    return (
        <>
            <header>
                {userData ? (
                    <Navbar userAvatar={userData.avatar.medium} />
                ) : (
                    <Navbar activeMenu="anime" />
                )}
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
