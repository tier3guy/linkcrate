/* eslint-disable react/style-prop-object */
// Internal Imports
import React, { useEffect, useRef, useState } from "react";

// Contexts
import { useAuthContext } from "../contexts/AuthContext";

// External Imports
import { storage, updateFirebaseProfile, auth } from "../firesbase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

// Utils
import { refactorName } from "../utils/";

const InputSection = ({
    label,
    placeholder,
    type,
    value,
    setValue,
    style,
    labelStyle,
    inputStyle,
    required
}) => {
    return (
        <div
            className={`flex flex-col justify-between md:flex-row items-center ${style}`}
        >
            <label
                htmlFor={label}
                className={`text-slate-800 text-xl ${labelStyle}`}
            >
                {label}
                <span className="text-red-500 text-3xl">
                    {required && " *"}
                </span>
            </label>
            <input
                type={type || "text"}
                className={`${
                    type === "textarea" ? "hidden" : "block"
                } md:w-[75%] py-4 px-5 border-slate-200 rounded-lg shadow-lg focus:outline-none text-lg ${inputStyle}`}
                id={label}
                placeholder={placeholder}
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
            {type === "textarea" && (
                <textarea
                    className={`hidden md:block py-4 px-5 border-slate-200 rounded-lg shadow-lg focus:outline-none text-lg ${inputStyle}`}
                    id={label}
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
            )}
        </div>
    );
};

const Profile = () => {
    const { user, setUser, setLoading } = useAuthContext();
    const inputRef = useRef(null);
    const [image, setImage] = useState(null);
    const [selectedImageURL, setSelectedImageURL] = useState(null);

    // User Data To Store
    const [displayName, setDisplayName] = useState(
        user?.displayName ? refactorName(user?.displayName) : ""
    );
    const [bio, setBio] = useState("");
    const [phone, setPhone] = useState("");

    useEffect(() => {
        setSelectedImageURL(user?.photoURL);
        setDisplayName(
            user?.displayName ? refactorName(user?.displayName) : ""
        );
    }, [user]);

    useEffect(() => {
        setLoading(true);
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (!user) return;
            setUser(user);
        });
        setLoading(false);
        return unsubscribe;
    }, []);

    const uploadImage = async () => {
        if (!image) return;
        try {
            const imageRef = ref(storage, `user/${user?.uid}/profile.jpg`);
            await uploadBytes(imageRef, image);

            const imageURL = await getDownloadURL(imageRef);
            await updateFirebaseProfile({
                photoURL: imageURL
            });
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="pt-16 px-16 pb-5">
            <div className="h-[200px] w-full rounded-lg bg-gradient-custom grid place-content-center relative">
                <a
                    href={`https://linkcrate.vercel.app/${displayName}`}
                    className="text-white text-2xl"
                >
                    https://linkcrate.vercel.app/{displayName}
                </a>
                <img
                    className="h-[150px] w-[150px] border-4 border-slate-100 rounded-full absolute left-1/2 -translate-x-1/2 top-full -translate-y-1/2"
                    src={selectedImageURL}
                    alt="User"
                />
            </div>
            <div className="mt-[90px] text-center">
                <input
                    type="file"
                    ref={inputRef}
                    className="hidden"
                    onChange={(e) => {
                        if (!e.target.files || !e.target.files[0]) return;
                        setImage(e.target.files[0]);
                        setSelectedImageURL(
                            URL.createObjectURL(e.target.files[0])
                        );
                    }}
                />
                <p
                    onClick={() => {
                        if (!inputRef || !inputRef.current) return;
                        inputRef.current.click();
                    }}
                    className="bg-gray-200 hover:bg-slate-300 px-3 py-2 cursor-pointer max-w-fit m-auto rounded-xl"
                >
                    Change your Profile Picture
                </p>
            </div>
            <div className="mt-6 w-[70%] m-auto py-4 flex flex-col space-y-8">
                <InputSection
                    label={"Linkcrate Name"}
                    placeholder={"Linkcrate Name"}
                    value={displayName}
                    setValue={setDisplayName}
                    required
                />
                <InputSection
                    label={"Bio"}
                    placeholder={"Tell us Somthing about Yourself."}
                    style={"md:flex-col space-y-2 md:items-start"}
                    inputStyle={"md:w-[100%] h-36 resize-none"}
                    value={bio}
                    setValue={setBio}
                    type="textarea"
                />
                <InputSection
                    label={"Phone"}
                    placeholder={"Can we have your contact number ?"}
                    value={phone}
                    setValue={setPhone}
                />
            </div>
        </div>
    );
};

export default Profile;
