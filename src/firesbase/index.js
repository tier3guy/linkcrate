// External Imports
import { initializeApp } from "firebase/app";
import {
    getAuth,
    GoogleAuthProvider,
    GithubAuthProvider,
    updateProfile,
    deleteUser
} from "firebase/auth";
import { getStorage } from "firebase/storage";
import {
    getFirestore,
    collection,
    getDoc,
    doc,
    updateDoc,
    getDocs,
    setDoc
} from "firebase/firestore";

// Configs
import firebaseConfig from "./config";

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
export const googleAuthProvider = new GoogleAuthProvider();
export const githubAuthProvider = new GithubAuthProvider();

export const deleteAccount = async () => {
    try {
        await deleteUser(auth.currentUser);
    } catch (error) {
        console.log(error);
    }
};

export const updateFirebaseProfile = async (data) => {
    try {
        await updateProfile(auth.currentUser, data);
    } catch (err) {
        console.log(err);
    }
};

export const retriveData = async () => {
    try {
        const userRef = doc(collection(db, "users"), auth.currentUser.uid);

        const documentSnapshot = await getDoc(userRef);

        if (documentSnapshot.exists()) {
            return documentSnapshot.data();
        } else {
            console.log("Document not found.");
        }
    } catch (error) {
        console.log("Error getting document:", error);
    }
};

export const retriveAllLinkcrateName = async () => {
    try {
        const usersRef = collection(db, "users");
        const querySnapshot = await getDocs(usersRef);

        const filteredData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        }));

        const linkcrateClaimedNames = filteredData.map(
            (data) => data.linkcrateName
        );
        return linkcrateClaimedNames;
    } catch (err) {
        console.log(err);
    }
};

export const updateData = async (data) => {
    try {
        const userRef = doc(collection(db, "users"), auth.currentUser.uid);
        await updateDoc(userRef, data);
        return true;
    } catch (error) {
        console.log("Error updating document:", error);
        return false;
    }
};

export const createData = async (collectionName, id, data) => {
    try {
        const userRef = doc(collection(db, collectionName), id);
        await setDoc(userRef, data);
        return true;
    } catch (error) {
        console.log("Error updating document:", error);
        return false;
    }
};
