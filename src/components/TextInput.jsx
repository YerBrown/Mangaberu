import React, { useState } from "react";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import "./TextInput.css";
const TextInput = ({ placeHolder, onSubmit }) => {
    const [value, setValue] = useState("");
    const [isFocused, setIsFocused] = useState(false);

    const handleClearValue = () => {
        setValue("");
    };
    return (
        <div className="text-input">
            <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder={placeHolder}
                className={`${isFocused ? "focused" : ""}`}
            />
            <button
                className={
                    value.length > 0 ? "clear-button active" : "clear-button"
                }
                onClick={() => handleClearValue()}
            >
                <CancelRoundedIcon fontSize="small" />
            </button>
        </div>
    );
};

export default TextInput;
