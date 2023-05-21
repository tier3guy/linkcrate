import React from "react";

const Spinner = () => {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-b-0 border-blue-600"></div>
        </div>
    );
};

export default Spinner;
