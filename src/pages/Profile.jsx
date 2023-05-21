// Internal Imports
import React, { useEffect, useRef, useState } from "react";

// Contexts
import { useAuthContext } from "../contexts/AuthContext";

// External Imports
import {
    storage,
    updateFirebaseProfile,
    auth,
    updateData,
    retriveData
} from "../firesbase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

// Components
import { Footer, Navbar } from "../components";

const InputSection = ({
    label,
    setLabel,
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
    labelPlaceholder,
    onChangeCustom,
    onKeyPress,
    canDelete,
    index,
    deleteFunction,
    editFunction,
    textareaStyle
}) => {
    return (
        <div>
            <div
                className={`flex flex-col justify-between md:flex-row md:items-center ${style}`}
            >
                <textarea
                    placeholder={labelPlaceholder}
                    contentEditable={enable ? true : false}
                    disabled={enable ? false : true}
                    value={label + (required ? " *" : "")}
                    onChange={setLabel}
                    className={`scroll-none text-slate-800 text-lg md:w-[25%] resize-none focus:outline-none ${labelStyle} ${
                        !enable
                            ? "caret-transparent bg-transparent h-[40px] md:h-full"
                            : "mb-2 md:mb-0 px-4 py-3 bg-white h-[55px] rounded-lg shadow-lg"
                    } ${textareaStyle}`}
                />
                <input
                    type={type || "text"}
                    className={`${
                        type === "textarea" ? "hidden" : "block"
                    } w-full md:w-[70%] py-4 px-5 h-[55px] border-slate-200 rounded-lg shadow-lg focus:outline-none text-lg ${inputStyle}`}
                    id={label}
                    placeholder={placeholder}
                    value={value}
                    onChange={
                        onChangeCustom
                            ? (e) => onChangeCustom(e)
                            : (e) => setValue(e.target.value)
                    }
                    onKeyDown={onKeyPress ? (e) => onKeyPress(e) : () => {}}
                />
                {type === "textarea" && (
                    <textarea
                        className={`md:block py-4 px-5 border-slate-200 rounded-lg shadow-lg focus:outline-none text-lg ${inputStyle}`}
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
            {canDelete && (
                <div className="flex space-x-4 mt-2 ml-2">
                    <p
                        onClick={() => {
                            deleteFunction(index);
                        }}
                        className="text-slate-600 cursor-pointer"
                    >
                        Remove Link
                    </p>
                    <p
                        onClick={() => {
                            // editFunction(index);
                        }}
                        className="text-slate-500 cursor-not-allowed"
                    >
                        Edit
                    </p>
                </div>
            )}
        </div>
    );
};

const Profile = () => {
    const { user, setUser, setLoading, profile, setProfile } = useAuthContext();
    const inputRef = useRef(null);
    const [image, setImage] = useState(null);
    const [selectedImageURL, setSelectedImageURL] = useState(null);
    const [loadingIn, setLoadingIn] = useState(false);
    const [error, setError] = useState("");

    // User Data To Store
    const [displayName, setDisplayName] = useState(
        profile?.linkcrateName ? profile?.linkcrateName : ""
    );
    const [bio, setBio] = useState("");
    const [phone, setPhone] = useState("");
    const [job, setJob] = useState("");
    const [alternativeEmail, setAlternativeEmail] = useState("");
    const [linksAttached, setLinksAttached] = useState([]);
    const [newLinkTitle, setNewLinkTitle] = useState({
        title: "",
        link: ""
    });

    const deleteLink = (index) => {
        setLinksAttached(linksAttached.filter((link, i) => i !== index));
    };

    // To render image
    useEffect(() => {
        setLoading(true);
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (!user) return;
            setUser(user);
            const prof = await retriveData();
            setProfile(prof);
            setSelectedImageURL(user?.photoURL);
        });
        setLoading(false);
        return unsubscribe;
    }, []);

    // To render name
    useEffect(() => {
        if (!profile) return;
        setLoading(true);
        setDisplayName(profile?.linkcrateName);
        setBio(profile?.bio);
        setPhone(profile?.phone);
        setJob(profile?.jobTitle);
        setAlternativeEmail(profile?.alternativeEmail);
        setLinksAttached(profile?.links);
        setLoading(false);
    }, [profile]);

    const uploadImage = async () => {
        if (!image) return;
        try {
            const imageRef = ref(storage, `user/${user?.uid}/profile.jpg`);
            await uploadBytes(imageRef, image);

            const imageURL = await getDownloadURL(imageRef);
            await updateFirebaseProfile({
                photoURL: imageURL
            });
            await updateData({
                photoURL: imageURL
            });
        } catch (err) {
            console.log(err);
        }
    };

    const handleUpdate = async () => {
        setLoadingIn(true);
        try {
            await updateData({
                alternativeEmail,
                bio,
                phone,
                jobTitle: job,
                links: linksAttached,
                linkcrateName: displayName
            });
            await uploadImage();
        } catch (err) {
            console.log(err);
        }
        setLoadingIn(false);
    };

    return (
        <>
            <Navbar />
            <div className="md:pt-16 md:px-16 pb-5 p-8 flex flex-col items-center">
                {/* Image Container */}
                <div className="h-[200px] w-full rounded-lg bg-gradient-custom grid place-content-center relative">
                    <a
                        href={`https://linkcrate.vercel.app/${displayName}`}
                        className="text-white md:text-2xl text-lg"
                    >
                        <p>https://linkcrate.vercel.app/{displayName}</p>
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
                <div className="mt-6 w-[100%] md:w-[70%] m-auto py-4 flex flex-col space-y-8">
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
                        value={phone === 0 ? "" : phone}
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
                                            value={link?.link}
                                            description={link?.description}
                                            type="url"
                                            enable
                                            canDelete
                                            deleteFunction={deleteLink}
                                            index={index}
                                            textareaStyle={
                                                "border-3 border-blue-500"
                                            }
                                            inputStyle={"w-[80%]"}
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
                                    label={newLinkTitle.title}
                                    setLabel={(e) => {
                                        setNewLinkTitle((prev) => ({
                                            ...prev,
                                            title: e.target.value
                                        }));
                                    }}
                                    placeholder={"Enter the link here"}
                                    value={newLinkTitle.link}
                                    setValue={setNewLinkTitle}
                                    labelPlaceholder={"Title"}
                                    enable
                                    onChangeCustom={(e) => {
                                        setNewLinkTitle((prev) => ({
                                            ...prev,
                                            link: e.target.value
                                        }));
                                    }}
                                    onKeyPress={(e) => {
                                        if (
                                            newLinkTitle.link === "" ||
                                            newLinkTitle.title === ""
                                        ) {
                                            setError(
                                                "Enter both Title and Link in order to add the link."
                                            );
                                            return;
                                        }

                                        if (13 === e.keyCode) {
                                            setLinksAttached((prev) => [
                                                ...prev,
                                                newLinkTitle
                                            ]);

                                            setNewLinkTitle((prev) => ({
                                                title: "",
                                                link: ""
                                            }));
                                        }
                                    }}
                                />
                            </div>
                            <p className="text-red-500 mt-2 text-base">
                                {error}
                            </p>
                        </div>
                        <button
                            onClick={() => {
                                if (
                                    newLinkTitle.link === "" ||
                                    newLinkTitle.title === ""
                                ) {
                                    setError(
                                        "Enter both Title and Link in order to add the link."
                                    );
                                    return;
                                }

                                setLinksAttached((prev) => [
                                    ...prev,
                                    newLinkTitle
                                ]);

                                setNewLinkTitle((prev) => ({
                                    title: "",
                                    link: ""
                                }));
                            }}
                            className="md:hidden text-white w-full rounded-3xl py-2 bg-blue-500"
                        >
                            Add Link
                        </button>
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
                    onClick={handleUpdate}
                    className="mt-10 bg-blue-600 w-full md:w-[70%] px-6 py-3 rounded-3xl hover:bg-blue-700 text-white"
                >
                    {loadingIn ? "Loading..." : "Update Profile"}
                </button>
            </div>
            <Footer />
        </>
    );
};

export default Profile;
