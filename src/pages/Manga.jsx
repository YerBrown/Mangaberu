import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
function Manga() {
    const { userData, isLoading } = useAuth();
    return (
        <>
            <header>
                {userData ? (
                    <Navbar userAvatar={userData.avatar.medium} />
                ) : (
                    <Navbar activeMenu="manga" />
                )}
            </header>
            <main>
                <h1>Manga</h1>
            </main>
        </>
    );
}

export default Manga;
