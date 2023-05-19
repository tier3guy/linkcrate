// Internal Imports
import { useState, useEffect, createContext, useContext } from "react";

// Firebase Imports
import { auth } from "../firesbase/index";

export const AuthContext = createContext();

export const useAuthContext = () => {
    return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    // For Account Creation Form
    const [loginModalVisibilty, setLoginModalVisibilty] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");

    useEffect(() => {
        setLoading(true);
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
            setLoading(false);
        });
        setLoading(false);
        return unsubscribe;
    }, []);

    useEffect(() => {
        console.log(user);
    }, [user]);

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
                setLoginModalVisibilty
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
