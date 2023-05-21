import React, { useEffect, useState } from "react";

// Pages
import Error from "./Error";
import LoadingPage from "./LoadingPage";

// External Components
import { useParams } from "react-router-dom";

// Firebase
import { retriveData, fetchUid } from "../firesbase";

// Components
import { Logo, ShareProfileModal } from "../components";

const LinkcrateProfile = () => {
    const { name } = useParams();
    const [profile, setProfile] = useState(null);
    const [notFound, setNotFound] = useState(false);
    const [loading, setLoading] = useState(true);
    const [shareModalVisibility, setShareModalVisibility] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await fetchUid(name);
            if (res === undefined) {
                setNotFound(true);
            } else {
                const uid = res.uid;
                const data = await retriveData(uid);
                setProfile(data);
            }
            setLoading(false);
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (notFound) return <Error />;
    if (loading) return <LoadingPage />;

    return (
        <>
            <ShareProfileModal
                visible={shareModalVisibility}
                setVisibility={setShareModalVisibility}
                url={window.location.href}
            />

            <div className="min-h-screen w-screen bg-slate-800 text-white">
                <button
                    onClick={() => {
                        setShareModalVisibility(true);
                    }}
                    className="absolute right-2 top-2 bg-slate-400 h-10 w-10 rounded-full grid place-content-center"
                >
                    <i className="text-gray-100 fa-solid fa-share-nodes"></i>
                </button>

                <div className="w-[90%] md:w-[50%] pt-20 pb-10 md:py-10 m-auto min-h-screen flex flex-col items-center">
                    <img
                        src={profile?.photoURL ? profile?.photoURL : ""}
                        alt="user"
                        className="rounded-full w-28 h-28"
                    />
                    <p className="text-semibold text-xl my-4">{"@" + name}</p>
                    <p className="text-sm w-full md:w-2/3 text-center">
                        {profile?.bio ? profile?.bio : ""}
                    </p>
                    <div className="my-8 w-full">
                        {profile?.links?.map((link, index) => {
                            return (
                                <a
                                    href={link.link}
                                    rel="noreferrer"
                                    key={index}
                                    className="mb-4 cursor-pointer text-center bg-slate-400 text-white p-4 hover:bg-slate-500 block"
                                >
                                    {link.title}
                                </a>
                            );
                        })}
                    </div>
                    <div className="flex flex-col md:flex-row mt-10 md:items-center">
                        <p className="text-white md:mr-4">Powered by</p>
                        <Logo />
                    </div>
                </div>
            </div>
        </>
    );
};

export default LinkcrateProfile;
