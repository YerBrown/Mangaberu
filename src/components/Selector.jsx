import { useState, useEffect, useRef } from "react";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import RadioButtonUncheckedRoundedIcon from "@mui/icons-material/RadioButtonUncheckedRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
function Selector({
    options,
    noOptionText,
    onChange,
    defaultValue = -1,
    noNull = false,
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOptionIndex, setSelectedOptionIndex] =
        useState(defaultValue);
    const dropdownRef = useRef(null);

    useEffect(() => {
        setSelectedOptionIndex(defaultValue);
    }, [defaultValue]);

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

    const toggleOption = (optionIndex) => {
        setSelectedOptionIndex((prev) => {
            if (prev == optionIndex && !noNull) {
                return -1;
            } else {
                return optionIndex;
            }
        });
        if (onChange) {
            onChange(options[optionIndex].id);
        }
    };
    return (
        <>
            <div className="selector" ref={dropdownRef}>
                <div
                    className={
                        selectedOptionIndex >= 0
                            ? "selector-container"
                            : "selector-container placeholder"
                    }
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <ExpandMoreRoundedIcon />
                    {selectedOptionIndex >= 0
                        ? options[selectedOptionIndex].label
                        : noOptionText}
                </div>
                {isOpen && (
                    <div className="options-popup">
                        <div className="option-container">
                            {options.map((option, index) => (
                                <div
                                    key={option.id}
                                    onClick={() => toggleOption(index)}
                                    className={
                                        index == selectedOptionIndex
                                            ? "option-item active"
                                            : "option-item"
                                    }
                                >
                                    {option.label}

                                    {index == selectedOptionIndex ? (
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

export default Selector;
