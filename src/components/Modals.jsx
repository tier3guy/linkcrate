// Components
import ModalsWrapper from "./ModalsWrapper";

// Contexts
import { useAuthContext } from "../contexts/AuthContext";

// Internal Imports
import { useState } from "react";

// External Imports
import {
    auth,
    googleAuthProvider,
    githubAuthProvider,
    deleteAccount,
    createData,
    retriveData,
    retriveAllLinkcrateName
} from "../firesbase";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut
} from "firebase/auth";
import { Link } from "react-router-dom";
import {
    EmailShareButton,
    FacebookShareButton,
    LinkedinShareButton,
    TelegramShareButton,
    TwitterShareButton,
    WhatsappShareButton
} from "react-share";

export const CreateAccountModal = ({ visible, setVisibility }) => {
    const {
        email,
        setEmail,
        password,
        setPassword,
        setUser,
        linkcrateName,
        setLinkcrateName,
        setProfile
    } = useAuthContext();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const checkIfNameAvailable = async () => {
        try {
            const res = await retriveAllLinkcrateName();
            for (var i = 0; i < res.length; i++) {
                if (res[i] === linkcrateName) return false;
            }
            return true;
        } catch (err) {
            setError(err.message);
        }
    };

    const handleSignup = async () => {
        if (loading) return;
        if (!email || !password || !linkcrateName)
            return setError("All the field are necessary in this case!");

        const res = await checkIfNameAvailable();
        if (!res) {
            setError(
                "Linkcrate Name already exists. Please try something else."
            );
            return;
        }

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
                await createData("linkcrate", user.uid, {
                    alternativeEmail: "",
                    bio: "",
                    jobTitle: "",
                    linkcrateName,
                    links: [],
                    phone: 0,
                    photoURL: user.photoURL
                });
                await createData("users", linkcrateName, {
                    uid: user.uid
                });
                const prof = await retriveData();
                setProfile(prof);
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
        if (!linkcrateName) {
            setError(
                "Linkcrate Name should not be empty! You have to choose one domain before creating the account."
            );
            return;
        }
        const res = await checkIfNameAvailable();
        if (!res) {
            setError(
                "Linkcrate Name already exists. Please try something else."
            );
            return;
        }

        setLoading(true);
        try {
            const res = await signInWithPopup(auth, googleAuthProvider);
            if (res) {
                const user = auth.currentUser;
                setUser(user);
                await createData("linkcrate", user.uid, {
                    alternativeEmail: "",
                    bio: "",
                    jobTitle: "",
                    linkcrateName,
                    links: [],
                    phone: 0,
                    photoURL: user.photoURL
                });
                await createData("users", linkcrateName, {
                    uid: user.uid
                });
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
        if (!linkcrateName) {
            setError(
                "Linkcrate Name should not be empty! You have to choose one domain before creating the account."
            );
            return;
        }
        const res = await checkIfNameAvailable();
        if (!res) {
            setError(
                "Linkcrate Name already exists. Please try something else."
            );
            return;
        }

        setLoading(true);
        try {
            const res = await signInWithPopup(auth, githubAuthProvider);
            if (res) {
                const user = auth.currentUser;
                setUser(user);
                await createData("linkcrate", user.uid, {
                    alternativeEmail: "",
                    bio: "",
                    jobTitle: "",
                    linkcrateName,
                    links: [],
                    phone: 0,
                    photoURL: user.photoURL
                });
                await createData("users", linkcrateName, {
                    uid: user.uid
                });
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
                className={`border-1 m-auto w-[90%] md:w-[500px] relative bg-white rounded-3xl opacity-100 shadow-md ${
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

                <div className="md:p-8 p-4">
                    <div className="flex flex-col">
                        <div className="flex flex-col space-y-1">
                            <div className="mb-4">
                                <p className="ml-1 mb-1 text-slate-800">
                                    Linkcrate Name*
                                </p>
                                <input
                                    type="text"
                                    className="w-full border-2 border-slate-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={linkcrateName}
                                    onChange={(e) =>
                                        setLinkcrateName(e.target.value)
                                    }
                                />
                            </div>
                        </div>
                        <div className="flex space-x-2 items-center">
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
                                <p className="ml-1 mb-1 text-slate-800">
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

export const LoginModal = ({ visible, setVisibility }) => {
    const { email, setEmail, password, setPassword, setUser } =
        useAuthContext();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async () => {
        if (loading) return;
        setLoading(true);
        try {
            const res = await signInWithEmailAndPassword(auth, email, password);
            if (res) {
                const user = auth.currentUser;
                setUser(user);
                setVisibility(false);
            }
            setLoading(false);
        } catch (err) {
            if (err.message === "Firebase: Error (auth/wrong-password).") {
                setError("Either Email or Password is Incorrect.");
            }
            setLoading(false);
        }
    };

    const signinWithGoogle = async () => {
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

    const signinWithGithub = async () => {
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
                className={`border-1 w-[90%] m-auto md:w-[500px] relative bg-white rounded-3xl opacity-100 shadow-md ${
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
                    <p className="text-2xl">Welcome Back,</p>
                    <p className="text-slate-400 my-1">
                        Enter your Email and Password to log into your account,
                        or use Login With Google/Github
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
                            onClick={handleLogin}
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
                        onClick={signinWithGoogle}
                        className="flex items-center justify-center border-2 rounded-3xl w-full py-2 hover:border-red-500"
                    >
                        <i className="fa-brands fa-google-plus-g text-red-500 mr-[10px]"></i>
                        Log in with Google
                    </button>
                    <button
                        onClick={signinWithGithub}
                        className="mt-3 flex items-center justify-center border-2 rounded-3xl w-full py-2 hover:border-gray-800"
                    >
                        <i className="fa-brands fa-github mr-[10px]"></i>
                        Log in with Github
                    </button>
                </div>
            </div>
        </ModalsWrapper>
    );
};

export const ProfileDropDownModal = ({
    visible,
    setVisibility,
    setDeleteAccountModal,
    deleteAccountModal
}) => {
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
            },
            {
                name: "Blogs",
                icon: "fa-solid fa-blog",
                link: "/blogs",
                style: "md:hidden"
            },
            {
                name: "FAQ",
                icon: "fa-solid fa-question",
                link: "/faq",
                style: "md:hidden"
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
                        window.location.reload();
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
            },
            {
                name: "Delete Account",
                icon: "fa-solid fa-trash",
                link: "/delete-account",
                action: () => {
                    setDeleteAccountModal(!deleteAccountModal);
                },
                style: "bg-red-600 hover:bg-red-700 text-white"
            }
        ]
    ];

    return (
        <div
            className={`${
                visible ? "block" : "hidden"
            } z-999999 absolute right-[5%] md:right-[2em] top-[4em] rounded-3xl bg-white w-[90%] md:w-[300px] shadow-md`}
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
                                className={`cursor-pointer flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-3xl ${
                                    item.style ? item.style : ""
                                }`}
                            >
                                <i className={`fa-fw ${item.icon}`}></i>
                                <p className="text-md">{item.name}</p>
                            </div>
                        ) : (
                            <Link
                                key={index}
                                to={item.link}
                                className={`flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-3xl ${
                                    item.style ? item.style : ""
                                }`}
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

export const DeleteAccountModal = ({ visible, setVisibility }) => {
    return (
        <ModalsWrapper visible={visible}>
            <div
                className={`border-1 w-[90%] m-auto md:w-[500px] relative bg-white rounded-3xl opacity-100 shadow-md ${
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
                <div className="p-5">
                    <p className="text-2xl">Are you sure ?</p>
                    <p className="text-slate-400 my-1">
                        Deleting your account means there is no way you can
                        again access your Linkcrate profile. Do you still want
                        to delete your account?
                    </p>
                </div>
                <div className="flex space-x-2 p-5">
                    <button
                        onClick={() => {
                            setVisibility(false);
                        }}
                        className="p-4 rounded-lg bg-gray-400 cursor-pointer w-full"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={async () => {
                            try {
                                await deleteAccount();
                                window.location.reload();
                                setVisibility(false);
                            } catch (err) {
                                console.log(err);
                            }
                        }}
                        className="p-4 rounded-lg bg-red-600 text-white cursor-pointer w-full"
                    >
                        Yes, Delete
                    </button>
                </div>
            </div>
        </ModalsWrapper>
    );
};

export const ShareProfileModal = ({ visible, setVisibility, url }) => {
    const [message, setMessage] = useState("");

    return (
        <ModalsWrapper visible={visible}>
            <div
                className={`border-1 w-[90%] m-auto md:w-[500px] relative bg-white rounded-3xl opacity-100 shadow-md ${
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
                <div className=" px-4 py-6 text-slate-800 text-xl">
                    Share your Linkcrate profile to your friends.
                </div>
                <div className="border-y-2 px-4 py-6 flex space-x-2 justify-between  md:justify-evenly">
                    <WhatsappShareButton
                        className="h-8 w-8 grid place-content-center"
                        url={url}
                    >
                        <i className="fa-brands fa-whatsapp text-slate-800 text-3xl"></i>
                    </WhatsappShareButton>
                    <FacebookShareButton
                        className="h-8 w-8 grid place-content-center"
                        url={url}
                    >
                        <i className="fa-brands fa-facebook-f text-slate-800 text-3xl"></i>
                    </FacebookShareButton>
                    <TwitterShareButton
                        className="h-8 w-8 grid place-content-center"
                        url={url}
                    >
                        <i className="fa-brands fa-twitter text-slate-800 text-3xl"></i>
                    </TwitterShareButton>
                    <LinkedinShareButton
                        className="h-8 w-8 grid place-content-center"
                        url={url}
                    >
                        <i className="fa-brands fa-linkedin-in text-slate-800 text-3xl"></i>
                    </LinkedinShareButton>
                    <TelegramShareButton
                        className="h-8 w-8 grid place-content-center"
                        url={url}
                    >
                        <i className="fa-brands fa-telegram text-slate-800 text-3xl"></i>
                    </TelegramShareButton>
                    <EmailShareButton
                        className="h-8 w-8 grid place-content-center"
                        url={url}
                    >
                        <i className="fa-brands fa-at text-slate-800 text-3xl"></i>
                    </EmailShareButton>
                </div>
                <div className="px-4 py-6">
                    <p className="text-slate-800 text-xl">
                        or just{" "}
                        <span
                            onClick={() => {
                                navigator.clipboard.writeText(url);
                                setMessage("Link Copied!");
                            }}
                            className="border-yellow-500 border-b-2 cursor-pointer"
                        >
                            copy
                        </span>{" "}
                        the url to share anywhere!
                    </p>
                    <p className="mt-4 text-[14px]">{message}</p>
                </div>
            </div>
        </ModalsWrapper>
    );
};
