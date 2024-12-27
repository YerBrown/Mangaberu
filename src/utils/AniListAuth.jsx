import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AniListAuth() {
    const navigate = useNavigate();

    useEffect(() => {
        const hash = window.location.hash;
        if (hash.includes("access_token")) {
            const token = new URLSearchParams(hash.slice(1)).get(
                "access_token"
            );
            localStorage.setItem("access_token", token);
            navigate("/user");
        } else {
            navigate("/user");
        }
    }, [navigate]);

    return (
        <div className="auth-container">
            <h1>Authenticating...</h1>
        </div>
    );
}

export default AniListAuth;
