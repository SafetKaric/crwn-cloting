import { useState } from "react";

import {
    createAuthUserWithEmailAndPassword,
    createUserDocFromAuth,
} from "../../utils/firebase/firebase.utils";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import "./sign-up-form.styles.scss";

const defaultFormFields = {
    displayName: "",
    email: "",
    password: "",
    confirm_password: "",
};

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirm_password } = formFields;

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirm_password) {
            alert("Password not match");
            return;
        }

        try {
            const { user } = await createAuthUserWithEmailAndPassword(
                email,
                password
            );

            await createUserDocFromAuth(user, { displayName });
            clearFormFields();
        } catch (error) {
            console.log("user not created", error.code);
        }
    };

    const clearFormFields = () => {
        setFormFields(defaultFormFields);
    };

    const hanleChange = (event) => {
        const { name, value } = event.target;

        setFormFields({
            ...formFields,
            [name]: value,
        });
    };

    return (
        <div className="sign-up-container">
            <h2>Don't heave an account?</h2>
            <span>Sign Up with your email and password</span>
            <form autoComplete="off" onSubmit={handleSubmit}>
                {/* Form Field */}
                <FormInput
                    label="Display Name"
                    type="text"
                    required
                    name="displayName"
                    value={displayName}
                    onChange={hanleChange}
                />
                {/* Form Field */}
                <FormInput
                    label="Email"
                    type="email"
                    required
                    name="email"
                    value={email}
                    onChange={hanleChange}
                />
                {/* Form Field */}
                <FormInput
                    label="Password"
                    type="password"
                    required
                    name="password"
                    value={password}
                    onChange={hanleChange}
                />
                {/* Form Field */}
                <FormInput
                    label="Confirm Password"
                    type="password"
                    required
                    name="confirm_password"
                    value={confirm_password}
                    onChange={hanleChange}
                />

                <Button type="submit" buttonType="default">
                    Sign Up
                </Button>
            </form>
        </div>
    );
};

export default SignUpForm;
