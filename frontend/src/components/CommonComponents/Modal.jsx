import React from "react";

const Modal = ({ isVisible, onClose, children }) => {
    if (!isVisible) {
        return null;
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center z-50">
            <div className="bg-wite rounded-lg shadow-lg w-1/2 relative">
                <button className="absolute top-2 right-2 text-2xl" onClick={onClose}>
                    &times;
                </button>
                {children}
            </div>
        </div>
    );
};

export default Modal;