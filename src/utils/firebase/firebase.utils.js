import { initializeApp } from "firebase/app";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import {
    getAuth,
    signInWithRedirect,
    GoogleAuthProvider,
    signInWithPopup,
} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBOlWFJ_pZhbfTwaY0GKUG__iGPN8GBgpI",
    authDomain: "crwn-clothing-db-d1758.firebaseapp.com",
    projectId: "crwn-clothing-db-d1758",
    storageBucket: "crwn-clothing-db-d1758.appspot.com",
    messagingSenderId: "974720523940",
    appId: "1:974720523940:web:29c284527fbd28acd1d031",
};

const firebaseApp = initializeApp(firebaseConfig);

const provier = new GoogleAuthProvider();
provier.setCustomParameters({
    prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provier);
export const db = getFirestore();

export const createUserDocFromAuth = async (userAuth) => {
    const userDocRef = doc(db, "users", userAuth.uid);

    console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);

    console.log(userSnapshot);
    console.log(userSnapshot.exists());

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
            });
        } catch (error) {
            console.log("Error creating user", error.message);
        }
    }

    return userDocRef;
};
