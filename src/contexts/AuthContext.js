/* eslint-disable react-hooks/exhaustive-deps */
// Internal Imports
import { useState, useEffect, createContext, useContext } from "react";

// Firebase Imports
import { auth, retriveData } from "../firesbase";

export const AuthContext = createContext();

export const useAuthContext = () => {
    return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);
    const [userPhotoURL, setUserPhotoURL] = useState(null);
    const [linkcrateName, setLinkcrateName] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    // For Account Creation and Login Form Only
    const [loginModalVisibilty, setLoginModalVisibilty] = useState(false);
    const [createAccountModalVisibility, setCreateAccountModalVisibility] =
        useState(false);
    const [deleteAccountModalVisibility, setDeleteAccountModalVisibility] =
        useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (!user) return;
            const prof = await retriveData();
            setProfile(prof);
            setUser(user);
        });
        return unsubscribe;
    }, []);

    useState(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1 * 1000);

        return () => {
            clearTimeout(timer);
        };
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
                linkcrateName,
                setLinkcrateName,
                loginModalVisibilty,
                setLoginModalVisibilty,
                createAccountModalVisibility,
                setCreateAccountModalVisibility,
                deleteAccountModalVisibility,
                setDeleteAccountModalVisibility,
                userPhotoURL,
                setUserPhotoURL,
                profile,
                setProfile
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
