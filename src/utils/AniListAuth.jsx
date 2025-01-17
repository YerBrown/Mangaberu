import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
function AniListAuth() {
    const navigate = useNavigate();

    useEffect(() => {
        const getToken = async () => {
            const code = new URLSearchParams(window.location.search).get(
                "code"
            );

            if (!code) {
                console.error("No authorization code found in URL");
                return;
            }

            try {
                const response = await fetch(
                    "https://server-mangaberu.yeraymorenogarcia.com/api/auth/token",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ code }),
                    }
                );

                const data = await response.json();

                if (data.access_token) {
                    localStorage.setItem("access_token", data.access_token);
                    navigate("/user");
                } else {
                    console.error("Failed to obtain token:", data);
                }
            } catch (error) {
                console.error("Fetch failed:", error);
            }
        };

        getToken();
    }, []);

    return (
        <div className="auth-container">
            <h1>Authenticating...</h1>
        </div>
    );
}

export default AniListAuth;
