import "./MultiSelector.css";
import { useState, useEffect, useRef } from "react";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import RadioButtonUncheckedRoundedIcon from "@mui/icons-material/RadioButtonUncheckedRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
function MultiSelector({ options, noOptionText, onChange }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const dropdownRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);
    const toggleOption = (optionId) => {
        setSelectedOptions((prev) => {
            if (prev.includes(optionId)) {
                return prev.filter((id) => id !== optionId);
            } else {
                return [...prev, optionId];
            }
        });
        if (onChange) {
            onChange(selectedOptions);
        }
    };

    const renderSelectedOptions = () => {
        const selectedItems = options.filter((opt) =>
            selectedOptions.includes(opt)
        );

        if (selectedItems.length === 0) {
            return <span>{noOptionText}</span>;
        }

        return (
            <div className="option-selected-container">
                {selectedItems.slice(0, 2).map((opt) => (
                    <span key={opt} className="option-item">
                        {opt}
                    </span>
                ))}
                {selectedItems.length > 2 && (
                    <span className="option-item">
                        +{selectedItems.length - 2}
                    </span>
                )}
            </div>
        );
    };
    return (
        <>
            <div className="selector" ref={dropdownRef}>
                <div
                    className={
                        selectedOptions.length > 0
                            ? "selector-container"
                            : "selector-container placeholder"
                    }
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <ExpandMoreRoundedIcon />
                    {renderSelectedOptions()}
                </div>
                {isOpen && (
                    <div className="options-popup">
                        <div className="option-container">
                            {options.map((option) => (
                                <div
                                    key={option}
                                    onClick={() => toggleOption(option)}
                                    className={
                                        selectedOptions.includes(option)
                                            ? "option-item active"
                                            : "option-item"
                                    }
                                >
                                    {option}

                                    {selectedOptions.includes(option) ? (
                                        <CheckCircleRoundedIcon fontSize="small" />
                                    ) : (
                                        <RadioButtonUncheckedRoundedIcon fontSize="small" />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
export default MultiSelector;
