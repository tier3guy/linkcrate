// Components
import ModalsWrapper from "./ModalsWrapper";

// Contexts
import { useAuthContext } from "../contexts/AuthContext";

// Internal Imports
import { useState } from "react";

// External Imports
import { auth, googleAuthProvider, githubAuthProvider } from "../firesbase";
import {
    createUserWithEmailAndPassword,
    signInWithPopup,
    signOut
} from "firebase/auth";
import { Link } from "react-router-dom";

export const CreateAccountModal = ({ visible, setVisibility }) => {
    const { email, setEmail, password, setPassword, setUser } =
        useAuthContext();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSignup = async () => {
        if (loading) return;
        if (!email || !password) return setError("Please fill all the fields!");

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

    const signupWithGithub = async () => {
        if (loading) return;

        setLoading(true);
        try {
            const res = await signInWithPopup(auth, githubAuthProvider);
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
                        <div className="flex flex-col space-y-1">
                            <div>
                                <p className="ml-1 mb-1 text-slate-800">
                                    Email*
                                </p>
                                <input
                                    type="email"
                                    className="w-full border-2 border-slate-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div>
                                <p className="ml-1 mb-1 text-slate-800 mt-4">
                                    Password*
                                </p>
                                <input
                                    type="password"
                                    className="w-full border-2 border-slate-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                            </div>
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
                        className="flex items-center justify-center border-2 rounded-3xl w-full py-2 hover:border-red-500"
                    >
                        <i className="fa-brands fa-google-plus-g text-red-500 mr-[10px]"></i>
                        Sign up with Google
                    </button>
                    <button
                        onClick={signupWithGithub}
                        className="mt-3 flex items-center justify-center border-2 rounded-3xl w-full py-2 hover:border-gray-800"
                    >
                        <i className="fa-brands fa-github mr-[10px]"></i>
                        Sign up with Github
                    </button>
                </div>
            </div>
        </ModalsWrapper>
    );
};

export const ProfileDropDownModal = ({ visible, setVisibility }) => {
    const { setUser } = useAuthContext();

    const dropdownMenus = [
        [
            {
                name: "Profile",
                icon: "fa-solid fa-user",
                link: "/profile"
            },
            {
                name: "Integrations",
                icon: "fa-solid fa-puzzle-piece",
                link: "/integrations"
            },
            {
                name: "Settings",
                icon: "fa-solid fa-cog",
                link: "/settings"
            }
        ],
        [
            {
                name: "Guide",
                icon: "fa-solid fa-scroll",
                link: "/guide"
            },
            {
                name: "Help Center",
                icon: "fa-solid fa-handshake-angle",
                link: "/help-center"
            }
        ],
        [
            {
                name: "Logout",
                icon: "fa-solid fa-sign-out",
                link: "/logout",
                action: async () => {
                    try {
                        await signOut(auth);
                        setUser(null);
                        setVisibility(false);
                    } catch (err) {
                        console.log(err);
                    }
                }
            },
            {
                name: "Close",
                icon: "fa-solid fa-circle-xmark",
                action: () => {
                    setVisibility(false);
                }
            }
        ]
    ];

    return (
        <div
            className={`${
                visible ? "block" : "hidden"
            } z-999999 absolute right-[2em] top-[4em] rounded-3xl bg-white w-[300px] shadow-md`}
        >
            {dropdownMenus.map((menu, index) => (
                <div
                    key={index}
                    className={`${
                        index !== dropdownMenus.length - 1
                            ? "border-b-2"
                            : "border-b-0"
                    } px-3 py-4`}
                >
                    {menu.map((item, index) => {
                        return item.action ? (
                            <div
                                key={index}
                                onClick={item.action}
                                className={`cursor-pointer flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-3xl`}
                            >
                                <i className={`fa-fw ${item.icon}`}></i>
                                <p className="text-md">{item.name}</p>
                            </div>
                        ) : (
                            <Link
                                key={index}
                                to={item.link}
                                className={`flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-3xl`}
                            >
                                <i
                                    className={`fa-fw ${item.icon} text-slate-700`}
                                ></i>
                                <p className="text-md">{item.name}</p>
                            </Link>
                        );
                    })}
                </div>
            ))}
        </div>
    );
};
