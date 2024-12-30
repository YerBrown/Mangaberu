import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

// Endpoint de AniList
const httpLink = createHttpLink({
    uri: "https://graphql.anilist.co/",
});

// Middleware para agregar el token
const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem("access_token");
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        },
    };
});

// Configuración del Apollo Client
const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});

export default client;
