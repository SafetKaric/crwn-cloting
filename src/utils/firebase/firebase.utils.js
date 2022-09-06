import { initializeApp } from "firebase/app";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    createUserWithEmailAndPassword,
} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBOlWFJ_pZhbfTwaY0GKUG__iGPN8GBgpI",
    authDomain: "crwn-clothing-db-d1758.firebaseapp.com",
    projectId: "crwn-clothing-db-d1758",
    storageBucket: "crwn-clothing-db-d1758.appspot.com",
    messagingSenderId: "974720523940",
    appId: "1:974720523940:web:29c284527fbd28acd1d031",
};

initializeApp(firebaseConfig);

const googleProvier = new GoogleAuthProvider();
googleProvier.setCustomParameters({
    prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvier);
export const db = getFirestore();

export const createUserDocFromAuth = async (
    userAuth,
    additionalInformation
) => {
    if (!userAuth) return;

    const userDocRef = doc(db, "users", userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation,
            });
        } catch (error) {
            console.log("Error creating user", error.message);
        }
    }

    return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
    return await createUserWithEmailAndPassword(auth, email, password);
};
