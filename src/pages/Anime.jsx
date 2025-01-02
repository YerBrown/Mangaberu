import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import TrendingSection from "../components/AnimePage/TrendingSection";
import DiscoverByFiltersSection from "../components/AnimePage/DiscoverByFiltersSection";
import Top10Score from "../components/AnimePage/Top10ScoreSection";
import "./Anime.css";
function Anime() {
    const { userData, isLoading } = useAuth();
    return (
        <>
            <header>
                {userData ? (
                    <Navbar
                        userAvatar={userData.avatar.medium}
                        activeMenu="anime"
                    />
                ) : (
                    <Navbar activeMenu="anime" />
                )}
            </header>
            <main>
                <div id="anime-menu">
                    <TrendingSection />
                    <DiscoverByFiltersSection />
                    <Top10Score />
                </div>
            </main>
        </>
    );
}

export default Anime;
