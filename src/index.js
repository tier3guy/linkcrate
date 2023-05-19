// Internal Imports
import React from "react";
import ReactDOM from "react-dom/client";

// External Imports
import { BrowserRouter } from "react-router-dom";

// Styles
import "./styles/index.css";

// Components
import App from "./App";

// Contexts
import { AuthContextProvider } from "./contexts/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthContextProvider>
                <App />
            </AuthContextProvider>
        </BrowserRouter>
    </React.StrictMode>
);
