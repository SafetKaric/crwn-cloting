import { createContext, useEffect, useReducer } from "react";

import {
    onAuthStateChangedListener,
    createUserDocFromAuth,
} from "../utils/firebase/firebase.utils";

// as the acual value you want access
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,
});

export const USER_ACTION_TYPES = {
    SET_CURRENT_USER: "SET_CURRENT_USER",
};

const userReducer = (state, action) => {
    console.log("dispatched");
    console.log(action);
    const { type, payload } = action;

    switch (type) {
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: payload,
            };
        default:
            throw new Error(`Unhendled type ${type} in useReducer`);
    }
};

const INITIAL_STATE = {
    currentUser: null,
};

export const UserProvider = ({ children }) => {
    const [{ currentUser }, dispatch] = useReducer(userReducer, INITIAL_STATE);
    console.log(currentUser);

    const setCurrentUser = (user) => {
        dispatch({ type: USER_ACTION_TYPES.SET_CURRENT_USER, payload: user });
    };

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
