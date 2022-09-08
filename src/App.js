import Home from "./routes/home/home.component";
import Navigation from "./routes/home/navigation/navigation.component";
import Authentication from "./routes/authentication/authentication.component.jsx";
import Shop from "./routes/shop/shop.component";
import Checkout from "./routes/checkout/checkout.component";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { setCurrentUser } from "./store/user/user.action";
import {
    onAuthStateChangedListener,
    createUserDocFromAuth,
} from "./utils/firebase/firebase.utils";

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const unscubrcibe = onAuthStateChangedListener(async (user) => {
            if (user) {
                await createUserDocFromAuth(user);
            }
            dispatch(setCurrentUser(user));
        });

        return unscubrcibe;
    }, [dispatch]);

    return (
        <Routes>
            <Route path="/" element={<Navigation />}>
                <Route index element={<Home />} />
                <Route path="shop/*" element={<Shop />} />
                <Route path="authentication" element={<Authentication />} />
                <Route path="checkout" element={<Checkout />} />
            </Route>
        </Routes>
    );
};

export default App;
