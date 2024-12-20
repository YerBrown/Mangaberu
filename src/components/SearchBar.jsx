import React, { useState } from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

import "./SearchBar.css";
function SearchBar({ onSearch }) {
    const [query, setQuery] = useState("");

    const handleSearch = (event) => {
        event.preventDefault();
        if (onSearch) {
            onSearch(query);
        }
    };

    return (
        <form onSubmit={handleSearch} className="search-bar">
            <input
                type="text"
                placeholder=""
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="search-input"
            />
            <button type="submit" className="search-button">
                <SearchOutlinedIcon fontSize="medium" />
            </button>
        </form>
    );
}

export default SearchBar;
