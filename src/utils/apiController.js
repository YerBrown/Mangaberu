import client from "./apolloClient";
import { gql } from "@apollo/client";

async function fetchData(query, variables) {
    try {
        const { data } = await client.query({
            query: gql`
                ${query}
            `, // Convierte la consulta a una plantilla gql
            variables: variables,
        });
        handleData(data);
    } catch (error) {
        handleError(error);
    }
}

async function handleResponse(response) {
    try {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        throw new Error("Error parsing JSON response: " + error.message);
    }
}

function handleData(data) {
    console.log("Data received:", data);
}

function handleError(error) {
    alert("Error fetching data. Check console for details.");
    console.error(error);
}

async function testFetch() {
    // import { GraphQLClient, gql } from "graphql-request";

    // Here we define our query as a multi-line string
    // Storing it in a separate .graphql/.gql file is also possible
    var query = `
query ($id: Int) { # Define which variables will be used in the query (id)
  Media (id: $id, type: ANIME) { # Insert our variables into the query arguments (id) (type: ANIME is hard-coded in the query)
    id
    title {
      romaji
      english
      native
    }
  }
}
`;

    // Define our query variables and values that will be used in the query request
    var variables = {
        id: 15125,
    };
    fetchData(query, variables);
}
