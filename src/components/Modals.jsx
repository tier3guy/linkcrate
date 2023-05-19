// Components
import ModalsWrapper from "./ModalsWrapper";

// Contexts
import { useAuthContext } from "../contexts/AuthContext";

// Internal Imports
import { useState } from "react";

// External Imports
import { auth, googleAuthProvider } from "../firesbase";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";

const Modals = ({ visible, setVisibility }) => {
    const {
        email,
        setEmail,
        password,
        setPassword,
        fname,
        setFname,
        lname,
        setLname,
        setUser
    } = useAuthContext();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSignup = async () => {
        if (loading) return;
        if (!fname || !lname || !email || !password)
            return setError("Please fill all the fields!");

        setLoading(true);
        try {
            const res = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            if (res) {
                const user = auth.currentUser;
                setUser(user);
                setVisibility(false);
            }
            setLoading(false);
        } catch (err) {
            if (
                err.message === "Firebase: Error (auth/email-already-in-use)."
            ) {
                setError("Email already in use! Please try logging in.");
            }
            setLoading(false);
        }
    };

    const signupWithGoogle = async () => {
        if (loading) return;

        setLoading(true);
        try {
            const res = await signInWithPopup(auth, googleAuthProvider);
            if (res) {
                const user = auth.currentUser;
                setUser(user);
                setVisibility(false);
            }
            setLoading(false);
        } catch (err) {
            if (
                err.message === "Firebase: Error (auth/email-already-in-use)."
            ) {
                setError("Email already in use! Please try logging in.");
            }
            setLoading(false);
        }
    };

    return (
        <ModalsWrapper visible={visible}>
            <div
                className={`border-1 min-w-[500px] relative bg-white rounded-3xl opacity-100 shadow-md ${
                    visible
                        ? "scale-100 animate-zoomIn"
                        : "scale-0 animate-zoomOut"
                }`}
            >
                <div
                    onClick={() => {
                        setVisibility(!visible);
                    }}
                    className="right-[-0.5rem] top-[-0.5rem] cursor-pointer absolute bg-gray-300 rounded-full h-8 w-8 grid place-content-center"
                >
                    <i className="fa-solid fa-xmark text-white"></i>
                </div>

                <div className="p-5 border-b-2 pb-4">
                    <p className="text-2xl">Create a Profile</p>
                    <p className="text-slate-400 my-1">
                        Create a free profile in less than 2 minutes
                    </p>
                </div>

                <div className="p-8">
                    <div className="flex flex-col">
                        <div className="flex justify-between space-x-2">
                            <div>
                                <p className="text-slate-800">First Name*</p>
                                <input
                                    type="text"
                                    className="border-2 border-slate-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={fname}
                                    onChange={(e) => setFname(e.target.value)}
                                />
                            </div>
                            <div>
                                <p className="text-slate-800">Last Name</p>
                                <input
                                    type="text"
                                    className="border-2 border-slate-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={lname}
                                    onChange={(e) => setLname(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col space-y-2 mt-4">
                            <p className="text-slate-800">Email*</p>
                            <input
                                type="email"
                                className="border-2 border-slate-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <p className="text-slate-800 mt-4">Password*</p>
                            <input
                                type="password"
                                className="border-2 border-slate-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        {error && <p className="text-red-500 mt-1">{error}</p>}
                        <button
                            onClick={handleSignup}
                            className={`bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-3xl mt-4 ${
                                loading && "cursor-not-allowed"
                            }}`}
                        >
                            <p className="text-base text-white font-medium">
                                {loading ? "Loading ..." : "Sign Up"}
                            </p>
                        </button>
                    </div>

                    <div className="flex items-center justify-between space-x-3 my-3">
                        <div className="h-[2px] bg-slate-200 w-full"></div>
                        <p className="text-slate-400">or</p>
                        <div className="h-[2px] bg-slate-200 w-full"></div>
                    </div>

                    <button
                        onClick={signupWithGoogle}
                        className="flex items-center justify-center border-2 rounded-3xl w-full py-2 hover:border-blue-500"
                    >
                        Sign up with Google
                    </button>
                </div>
            </div>
        </ModalsWrapper>
    );
};

export default Modals;
