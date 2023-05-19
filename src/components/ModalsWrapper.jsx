import React from "react";

const ModalsWrapper = ({ children, visible }) => {
    return (
        <div
            className={`${
                visible ? "block" : "hidden"
            } fixed top-0 left-0 h-screen w-screen backdrop-blur-sm grid place-content-center z-999999`}
        >
            {children}
        </div>
    );
};

export default ModalsWrapper;
