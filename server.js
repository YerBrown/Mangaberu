import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

// Proxy para obtener el token
app.post("/api/auth/token", async (req, res) => {
    const { code } = req.body;

    if (!code) {
        return res.status(400).json({ error: "Code is required" });
    }

    try {
        const response = await fetch("https://anilist.co/api/v2/oauth/token", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({
                grant_type: "authorization_code",
                client_id: process.env.CLIENT_ID,
                client_secret: process.env.CLIENT_SECRET,
                redirect_uri: process.env.REDIRECT_URI,
                code: code,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Error en respuesta de AniList:", errorData);
            throw new Error(`Error fetching token: ${response.status}`);
        }

        const data = await response.json();
        console.log("Token obtenido:", data);
        res.json(data); // Devuelve el token al cliente
    } catch (error) {
        console.error("Error al obtener el token:", error);
        res.status(500).json({ error: "Error al obtener el token" });
    }
});

app.listen(4000, () => console.log("Proxy running on http://localhost:4000"));
