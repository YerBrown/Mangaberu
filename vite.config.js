import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import mkcert from "vite-plugin-mkcert"; // Importa el plugin

export default defineConfig({
    plugins: [react(), mkcert()], // Añade mkcert a los plugins
    server: {
        https: true, // Activa HTTPS
        port: 3000, // Puerto del servidor
    },
});
