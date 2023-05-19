// Internal Imports
import React, { useEffect, useRef, useState } from "react";

// Contexts
import { useAuthContext } from "../contexts/AuthContext";

// External Imports
import { storage, updateFirebaseProfile } from "../firesbase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const Profile = () => {
    const { user } = useAuthContext();
    const inputRef = useRef(null);
    const [image, setImage] = useState(null);
    const [selectedImageURL, setSelectedImageURL] = useState(null);

    useEffect(() => {
        setSelectedImageURL(user?.photoURL);
    }, [user]);

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
            <div className="h-[200px] w-full rounded-lg bg-gradient-custom"></div>
            <img
                className="h-[150px] w-[150px] border-4 border-slate-100 rounded-full absolute left-1/2 -translate-x-1/2 mt-[-75px]"
                src={selectedImageURL}
                alt="User"
            />
            <div className="mt-[100px] text-center">
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

            <p onClick={uploadImage}>Save</p>
        </div>
    );
};

export default Profile;
