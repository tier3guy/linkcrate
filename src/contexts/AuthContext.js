/* eslint-disable react-hooks/exhaustive-deps */
// Internal Imports
import { useState, useEffect, createContext, useContext } from "react";

// Pages
import { LoadingPage } from "../pages";

// Firebase Imports
import { auth } from "../firesbase/index";

export const AuthContext = createContext();

export const useAuthContext = () => {
    return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [userPhotoURL, setUserPhotoURL] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    // For Account Creation and Login Form Only
    const [loginModalVisibilty, setLoginModalVisibilty] = useState(false);
    const [createAccountModalVisibility, setCreateAccountModalVisibility] =
        useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");

    useEffect(() => {
        setLoading(true);
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (!user) return;
            setUser(user);
        });
        setLoading(false);
        return unsubscribe;
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                error,
                setError,
                loading,
                setLoading,
                email,
                setEmail,
                password,
                setPassword,
                fname,
                setFname,
                lname,
                setLname,
                loginModalVisibilty,
                setLoginModalVisibilty,
                createAccountModalVisibility,
                setCreateAccountModalVisibility,
                userPhotoURL,
                setUserPhotoURL
            }}
        >
            {loading ? <LoadingPage /> : children}
        </AuthContext.Provider>
    );
};
