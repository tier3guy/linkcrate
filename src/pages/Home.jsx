// Pages
import Features from "./Features";

// Components
import { Footer, Navbar } from "../components";

// Firebase
import { retriveAllLinkcrateName } from "../firesbase";

// Internal Imports
import { useState } from "react";

// Contexts
import { useAuthContext } from "../contexts/AuthContext";

// Utils
import { containsSpecialCharactersOrWhiteSpace } from "../utils";

const Home = () => {
    const { linkcrateName, setLinkcrateName, setCreateAccountModalVisibility } =
        useAuthContext();
    const [error, setError] = useState("");

    const CheckUsername = async () => {
        var found = false;
        const allClaimedLinkcrateNames = await retriveAllLinkcrateName();
        for (let i = 0; i < allClaimedLinkcrateNames.length; i++) {
            if (allClaimedLinkcrateNames[i] === linkcrateName) {
                found = true;
                break;
            }
        }
        return found;
    };

    const ClaimUsername = async () => {
        if (!linkcrateName) {
            setError("Please enter your name to claim it.");
            return;
        }
        if (containsSpecialCharactersOrWhiteSpace(linkcrateName)) {
            setError(
                "Linkcrate Name should not contain any white space or any special character."
            );
            return;
        }
        const res = await CheckUsername();
        if (res) {
            setError(
                "Linkcrate Name already exists. Please try something else."
            );
            return;
        }
        setCreateAccountModalVisibility(true);
    };

    return (
        <>
            <Navbar />
            <div className="h-screen pt-28 px-8 md:pt-20 md:px-16">
                <div className="md:h-full md:w-full flex flex-col justify-center">
                    <p className="text-xl text-sky-800">
                        Just one click and its done,
                    </p>
                    <h1 className="md:w-2/3 md:leading-[75px] my-3 text-6xl font-bold text-slate-800">
                        One single{" "}
                        <span className="border-b-4 border-yellow-500">
                            Amazing Link
                        </span>{" "}
                        for everything
                    </h1>
                    <p className="mt-5 text-gray-500 md:w-2/3">
                        Linkcrate, web app that helps users collect and organize
                        their links in one place. Customize your page, track
                        analytics, and easily share your curated links. Simplify
                        link sharing with Linkcrate!
                    </p>
                    <p className="mt-5 text-gray-500 md:w-2/3">
                        Don't think much, its free and it takes less than a
                        minute.
                    </p>
                    <div className="hidden relative h-20 md:w-1/2 rounded-[6rem] bg-white border-2 mt-3 md:flex items-center px-8 py-2">
                        <p className="hidden md:block">linkcrate.vercel.app/</p>
                        <input
                            placeholder="your name"
                            type="text"
                            className="w-full h-full outline-none"
                            value={linkcrateName}
                            onChange={(e) => setLinkcrateName(e.target.value)}
                        />
                        <button
                            onClick={ClaimUsername}
                            className="bg-blue-500 hover:bg-blue-700 text-white rounded-[6rem] px-5 py-2 absolute right-1 h-[90%]"
                        >
                            Clame your Linkcrate
                        </button>
                    </div>

                    <div className="mt-3 h-3">
                        {error && (
                            <p className="text-red-500 text-base">{error}</p>
                        )}
                    </div>
                </div>
                <button
                    onClick={() => {
                        setCreateAccountModalVisibility(true);
                    }}
                    className="md:hidden bg-blue-500 hover:bg-blue-700 text-white rounded-[6rem] px-5 py-5"
                >
                    Clame your Linkcrate
                </button>
            </div>
            <Features />
            <Footer />
        </>
    );
};

export default Home;
