import { createContext, useContext } from "react";
import { useQuery } from "@apollo/client";
import { GET_USER_DATA, GET_USER_LISTS } from "../graphql/queries";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const token = localStorage.getItem("access_token");

    const { data: userData, loading: userLoading } = useQuery(GET_USER_DATA, {
        skip: !token,
        context: {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        },
    });

    const {
        data: mediaListsData,
        loading: listsLoading,
        refetch: refetchLists,
    } = useQuery(GET_USER_LISTS, {
        variables: { userId: userData?.Viewer?.id },
        skip: !userData,
        context: {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        },
    });

    const isLoading = userLoading || listsLoading;

    return (
        <AuthContext.Provider
            value={{
                userData: userData?.Viewer,
                animeLists: mediaListsData?.animeList?.lists || [],
                mangaLists: mediaListsData?.mangaList?.lists || [],
                favouritesLists: mediaListsData?.Viewer?.favourites || {},
                isLoading,
                refetchLists,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

// Hook personalizado para usar el contexto
export const useAuth = () => {
    return useContext(AuthContext);
};
