// External Imports
import { initializeApp } from "firebase/app";
import {
    getAuth,
    GoogleAuthProvider,
    GithubAuthProvider,
    updateProfile
} from "firebase/auth";
import { getStorage } from "firebase/storage";

// Configs
import firebaseConfig from "./config";

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const googleAuthProvider = new GoogleAuthProvider();
export const githubAuthProvider = new GithubAuthProvider();
export const updateFirebaseProfile = async (data) => {
    try {
        await updateProfile(auth.currentUser, data);
    } catch (err) {
        console.log(err);
    }
};
