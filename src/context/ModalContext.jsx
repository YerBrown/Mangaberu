import React, { createContext, useContext, useState } from "react";

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
    const [modalData, setModalData] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    const openModal = (data, mediaData, onSave = null) => {
        if (!data) {
            data = {
                status: "CURRENT",
                progress: 0,
                score: 0,
                startedAt: null,
                completedAt: null,
            };
        }
        setModalData({ data, mediaData, onSave });
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
        setModalData(null);
    };

    return (
        <ModalContext.Provider
            value={{ isOpen, modalData, openModal, closeModal }}
        >
            {children}
        </ModalContext.Provider>
    );
};

export const useModal = () => {
    return useContext(ModalContext);
};
