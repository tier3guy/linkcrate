// Pages
import Features from "./Features";

// Components
import { Footer } from "../components";

// Internal Imports
import { useState } from "react";

const Home = () => {
    const [username, setUsername] = useState("");

    return (
        <>
            <div className="h-screen pt-20 px-16">
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
                    <p className="mt-5 text-gray-500 w-2/3">
                        Linkcrate, web app that helps users collect and organize
                        their links in one place. Customize your page, track
                        analytics, and easily share your curated links. Simplify
                        link sharing with Linkcrate!
                    </p>
                    <p className="mt-5 text-gray-500 w-2/3">
                        Don't think much, its free and it takes less than a
                        minute.
                    </p>
                    <div className="relative md:h-20 md:w-1/2 rounded-[6rem] bg-white border-2 mt-3 flex items-center px-8 py-2">
                        <p>linkcrate.vercel.app/</p>
                        <input
                            placeholder="your name"
                            type="text"
                            className="w-full h-full outline-none"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <button className="bg-blue-500 hover:bg-blue-700 text-white rounded-[6rem] px-5 py-2 absolute right-1 h-[90%]">
                            Clame your Linkcrate
                        </button>
                    </div>
                </div>
            </div>
            <Features />
            <Footer />
        </>
    );
};

export default Home;
