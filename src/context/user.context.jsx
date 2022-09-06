import { createContext, useState, useEffect } from "react";

import {
    onAuthStateChangedListener,
    createUserDocFromAuth,
} from "../utils/firebase/firebase.utils";

// as the acual value you want access
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,
});

export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const value = { currentUser, setCurrentUser };

    useEffect(() => {
        const unscubrcibe = onAuthStateChangedListener(async (user) => {
            if (user) {
                await createUserDocFromAuth(user);
            }
            setCurrentUser(user);
        });
        return unscubrcibe;
    }, []);

    return (
        <UserContext.Provider value={value}> {children} </UserContext.Provider>
    );
};
