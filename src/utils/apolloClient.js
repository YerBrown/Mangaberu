import { ApolloClient, InMemoryCache } from "@apollo/client";

// Configura Apollo Client
const client = new ApolloClient({
    uri: "https://graphql.anilist.co", // Endpoint de la API GraphQL
    cache: new InMemoryCache(), // Manejo de cache para optimizar consultas
});

export default client;
