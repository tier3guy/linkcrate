import React, { useEffect, useState } from "react";

// Pages
import Error from "./Error";

// External Components
import { useParams } from "react-router-dom";

// Firebase
import { retriveData, fetchUid } from "../firesbase";

// Components
import { Logo } from "../components";

const LinkcrateProfile = () => {
    const { name } = useParams();
    const [profile, setProfile] = useState(null);
    const [notFound, setNotFound] = useState(false);
    const [loading, setLoading] = useState(true);

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
    if (loading)
        return (
            <div className="grid place-content-center bg-slate-800 h-screen w-screen text-white">
                Loading...
            </div>
        );
    return (
        <div className="min-h-screen w-screen bg-slate-800 text-white">
            <div className="w-[95%] md:w-[50%] py-10 m-auto min-h-screen flex flex-col items-center">
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
                            <div className="mb-4 cursor-pointer text-center bg-slate-400 text-white p-4 hover:bg-slate-500">
                                <a
                                    href={link.link}
                                    rel="noreferrer"
                                    key={index}
                                    className="text-white text-center"
                                >
                                    {link.title}
                                </a>
                            </div>
                        );
                    })}
                </div>
                <div className="flex flex-col md:flex-row mt-10 md:items-center">
                    <p className="text-white md:mr-4">Powered by</p>
                    <Logo />
                </div>
            </div>
        </div>
    );
};

export default LinkcrateProfile;
