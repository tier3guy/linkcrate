import React, { useEffect } from "react";

// External Components
import { useParams } from "react-router-dom";

// Contexts
import { useAuthContext } from "../contexts/AuthContext";

// Firebase
import { retriveData, auth } from "../firesbase";

const LinkcrateProfile = () => {
    const { name } = useParams();
    const { profile, setProfile, setLoading, setUser, user } = useAuthContext();

    useEffect(() => {
        const fetch = async () => {
            const data = await retriveData();
            setProfile(data);
        };
        fetch();
    }, [setProfile]);

    useEffect(() => {
        setLoading(true);
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (!user) return;
            const prof = await retriveData();
            setProfile(prof);
            setUser(user);
        });
        setLoading(false);
        return unsubscribe;
    }, [setLoading, setProfile, setUser]);

    return (
        <div className="min-h-screen w-screen bg-slate-800 text-white">
            <div className="w-[95%] md:w-[50%] py-10 m-auto min-h-screen flex flex-col items-center">
                <img
                    src={user?.photoURL ? user?.photoURL : ""}
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
                            <div className="mb-4 cursor-pointer text-center bg-slate-400 text-white p-4">
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
            </div>
        </div>
    );
};

export default LinkcrateProfile;
