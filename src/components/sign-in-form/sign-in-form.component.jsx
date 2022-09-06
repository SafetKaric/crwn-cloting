import { useState } from "react";

import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";

import {
    signInWithGooglePopup,
    signInUserWithEmailAndPassword,
    createUserDocFromAuth,
} from "../../utils/firebase/firebase.utils";

import "./sign-in-form.styles.scss";

const defaultFormFields = {
    email: "",
    password: "",
};

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const changeHandler = (event) => {
        const { name, value } = event.target;

        setFormFields({
            ...formFields,
            [name]: value,
        });
    };

    const signInWithGoogle = async () => {
        await signInWithGooglePopup();
    };

    const clearFormFields = () => {
        setFormFields(defaultFormFields);
    };

    const submitHandler = async (event) => {
        event.preventDefault();

        if (!email || !password) {
            alert("Please fill all fields");
            return;
        }

        try {
            await signInUserWithEmailAndPassword(email, password);
            clearFormFields();
        } catch (error) {
            switch (error.code) {
                case "auth/wrong-password":
                    alert("Incorect password.");
                    break;
                case "auth/user-not-found":
                    alert("No user found with this email.");
                    break;
                default:
                    alert(error.code);
            }
        }
    };

    return (
        <div className="sign-in-container">
            <h2>Alredy heave an account</h2>
            <span>Sign in with your email and password</span>
            <form autoComplete="off" onSubmit={submitHandler}>
                {/*Form Filed*/}
                <FormInput
                    label="Email"
                    type="email"
                    required
                    name="email"
                    value={email}
                    onChange={changeHandler}
                />
                {/*Form Filed*/}
                <FormInput
                    label="Password"
                    type="password"
                    required
                    name="password"
                    value={password}
                    onChange={changeHandler}
                />
                <div className="buttons-container">
                    <Button type="submit" buttonType="default">
                        SIGN IN
                    </Button>
                    <Button
                        type="button"
                        buttonType="google"
                        onClick={signInWithGoogle}
                    >
                        GOOGLE SIGN IN
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default SignInForm;
