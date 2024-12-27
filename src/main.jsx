import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import client from "./utils/apolloClient.js";
import router from "./utils/router";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <ApolloProvider client={client}>
            <ThemeProvider>
                <AuthProvider>
                    <RouterProvider router={router} />
                </AuthProvider>
            </ThemeProvider>
        </ApolloProvider>
    </StrictMode>
);
