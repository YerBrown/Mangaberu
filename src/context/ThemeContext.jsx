import { createContext, useContext, useState, useEffect } from "react";

// Crea el contexto
const ThemeContext = createContext();

// Proveedor del contexto
export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState("light");

    useEffect(() => {
        // Detectar el tema del navegador
        const darkModeQuery = window.matchMedia("(prefers-color-scheme: dark)");

        // Función para sincronizar con el sistema
        const updateTheme = (e) => {
            setTheme(e.matches ? "dark" : "light");
        };

        // Configura el tema inicial
        setTheme(darkModeQuery.matches ? "dark" : "light");

        // Escucha cambios en el tema del navegador
        darkModeQuery.addEventListener("change", updateTheme);

        return () => {
            darkModeQuery.removeEventListener("change", updateTheme);
        };
    }, []);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

// Hook personalizado para usar el contexto
export function useTheme() {
    return useContext(ThemeContext);
}
