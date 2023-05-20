/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/style-prop-object */
// Internal Imports
import React, { useEffect, useRef, useState } from "react";

// Contexts
import { useAuthContext } from "../contexts/AuthContext";

// External Imports
import { storage, updateFirebaseProfile, auth } from "../firesbase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import { createAvatar } from "@dicebear/core";
// import {
//     lorelei,
//     bigEars,
//     adventurer,
//     avataaars,
//     bigSmile,
//     bottts,
//     croodles,
//     funEmoji,
//     identicon,
//     initials,
//     micah,
//     miniavs,
//     notionists,
//     openPeeps,
//     personas,
//     pixelArt,
//     shapes,
//     thumbs
// } from "@dicebear/collection";

// Utils
import { refactorName } from "../utils/";

// Components
import { Footer, Navbar } from "../components";

// const generateRandomImage = async () => {
//     const avatarOptions = [
//         lorelei,
//         bigEars,
//         adventurer,
//         avataaars,
//         bigSmile,
//         bottts,
//         croodles,
//         funEmoji,
//         identicon,
//         initials,
//         micah,
//         miniavs,
//         notionists,
//         openPeeps,
//         personas,
//         pixelArt,
//         shapes,
//         thumbs
//     ];
//     const randomAvatar =
//         avatarOptions[Math.floor(Math.random() * avatarOptions.length)];

//     const avatar = createAvatar(randomAvatar, {
//         size: 128
//         // ... other options
//     });
//     const uri = avatar.toDataUriSync();
//     const image = await avatar.toFile("avatar.svg");
//     return {
//         uri,
//         image
//     };
// };

const InputSection = ({
    label,
    placeholder,
    type,
    value,
    setValue,
    style,
    labelStyle,
    inputStyle,
    required,
    description,
    enable,
    labelPlaceholder
}) => {
    return (
        <div>
            <div
                className={`flex flex-col justify-between md:flex-row items-center ${style}`}
            >
                <textarea
                    placeholder={labelPlaceholder}
                    contentEditable={enable ? true : false}
                    disabled={enable ? false : true}
                    value={label + (required ? " *" : "")}
                    className={`scroll-none text-slate-800 text-xl w-[25%] resize-none focus:outline-none ${labelStyle} ${
                        !enable
                            ? "caret-transparent bg-transparent"
                            : "px-4 py-3 bg-white h-[55px] rounded-lg shadow-lg"
                    }`}
                />
                <input
                    type={type || "text"}
                    className={`${
                        type === "textarea" ? "hidden" : "block"
                    } md:w-[70%] py-4 px-5 h-[55px] border-slate-200 rounded-lg shadow-lg focus:outline-none text-lg ${inputStyle}`}
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
            {description && (
                <p className="text-sm text-slate-600 mt-3">{description}</p>
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
    const [job, setJob] = useState("");
    const [alternativeEmail, setAlternativeEmail] = useState("");
    const [linksAttached, setLinksAttached] = useState([]);
    const [newLinkTitle, setNewLinkTitle] = useState("");

    // To render image and name
    useEffect(() => {
        setLoading(true);
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (!user) return;
            setUser(user);
            setSelectedImageURL(user?.photoURL);
            setDisplayName(
                user?.displayName ? refactorName(user?.displayName) : ""
            );
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
        <>
            <Navbar />
            <div className="pt-16 px-16 pb-5 flex flex-col items-center">
                {/* Image Container */}
                <div className="h-[200px] w-full rounded-lg bg-gradient-custom grid place-content-center relative">
                    <a
                        href={`https://linkcrate.vercel.app/${displayName}`}
                        className="text-white text-2xl"
                    >
                        https://linkcrate.vercel.app/{displayName}
                    </a>
                    <img
                        className="bg-gray-500 h-[150px] w-[150px] border-4 border-slate-100 rounded-full absolute left-1/2 -translate-x-1/2 top-full -translate-y-1/2"
                        src={selectedImageURL}
                        alt="User"
                    />
                </div>

                {/* Choose Image */}
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

                {/* Remove Image */}
                <span
                    onClick={() => {
                        // const { uri, image } = generateRandomImage();
                        // setSelectedImageURL(uri);
                        // setImage(image);
                    }}
                    className="text-center border-b-2 border-yellow-500 text-gray-500 text-base cursor-not-allowed mt-2"
                >
                    Remove Image
                </span>

                {/* Profile Information */}
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
                    <InputSection
                        label={"Job Title"}
                        placeholder={"What do you do for living ?"}
                        value={job}
                        setValue={setJob}
                        required
                    />
                    <InputSection
                        label={"Alternative Contact Email"}
                        placeholder={"Do you have any alternative Email ?"}
                        value={alternativeEmail}
                        setValue={setAlternativeEmail}
                        required
                        description={
                            "Enter an alternative email if you'd like to be contacted via a different email."
                        }
                    />

                    <div className="my-12 border-y-2 border-slate-300 pb-8">
                        <div className="my-8">
                            <p className="text-3xl text-slate-800">
                                Add Your Links
                            </p>
                        </div>

                        {linksAttached.map((link, index) => {
                            return (
                                <div
                                    key={index}
                                    className={`flex flex-col space-y-2 md:space-y-0 md:space-x-2 ${
                                        link?.description !== ""
                                            ? "mb-10"
                                            : "mb-4"
                                    }`}
                                >
                                    <div className="flex flex-col space-y-2 md:space-y-0 md:space-x-2">
                                        <InputSection
                                            label={link?.title}
                                            placeholder={"URL"}
                                            value={link?.url}
                                            description={link?.description}
                                            type="url"
                                            enable
                                        />
                                    </div>
                                </div>
                            );
                        })}

                        <div
                            key={2000}
                            className={`flex flex-col space-y-2 md:space-y-0 md:space-x-2 mb-4`}
                        >
                            <div className="flex flex-col space-y-2 md:space-y-0 md:space-x-2">
                                <InputSection
                                    label={""}
                                    placeholder={"Enter the link here"}
                                    value={newLinkTitle}
                                    setValue={setNewLinkTitle}
                                    labelPlaceholder={"Title"}
                                    enable
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <p className="md:w-[68%] mt-10 text-slate-500">
                    Privacy Policy: Your privacy is important to us. All the
                    information you provide in this form will be handled
                    securely and used solely for the purpose stated. We do not
                    share your personal data with any third parties.
                </p>

                {/* Save Button */}
                <button
                    onClick={uploadImage}
                    className="mt-10 bg-blue-600 w-full md:w-[70%] px-6 py-3 rounded-3xl hover:bg-blue-700 text-white"
                >
                    Update Profile
                </button>
            </div>
            <Footer />
        </>
    );
};

export default Profile;
