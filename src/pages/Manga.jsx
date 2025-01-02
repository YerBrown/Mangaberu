import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import TopPangaScore from "../components/MangaPage/TopMangaSection";
import TrendingMangaSection from "../components/MangaPage/TrendingMangaSection";
import DiscoverByFiltersSection from "../components/MangaPage/DiscoverByFiltersSection";
import "./Manga.css";
function Manga() {
    const { userData, isLoading } = useAuth();
    return (
        <>
            <header>
                {userData ? (
                    <Navbar
                        userAvatar={userData.avatar.medium}
                        activeMenu="manga"
                    />
                ) : (
                    <Navbar activeMenu="manga" />
                )}
            </header>
            <main id="manga-menu">
                <TrendingMangaSection />
                <DiscoverByFiltersSection />
                <TopPangaScore />
            </main>
        </>
    );
}

export default Manga;
