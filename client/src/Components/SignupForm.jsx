import React from "react";
import useSignup from "../Hooks/useSignup.js";
import "../Assets/Styles/AuthForm.css";
import { useAuthContext } from "../Hooks/useAuthContext.js";

const SignUpForm = () => {
    const { formik, isLoading } = useSignup();
    const { user } = useAuthContext();
    return (
        <>
            {user ? (
                <h1 style={{ textAlign: "center" }}>
                    No access to sign up page
                </h1>
            ) : (
                <form className="form" onSubmit={formik.handleSubmit}>
                    <h2>Sign Up</h2>
                    <input
                        type="text"
                        placeholder="Your Username"
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        name="username"
                    />
                    {formik.errors.username && formik.touched.username && (
                        <p className="error__schema">
                            {formik.errors.username}
                        </p>
                    )}
                    <input
                        type="email"
                        placeholder="Your Email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        name="email"
                    />
                    {formik.errors.email && formik.touched.email && (
                        <p className="error__schema">{formik.errors.email}</p>
                    )}
                    <input
                        type="password"
                        placeholder="Your Password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        name="password"
                    />
                    {formik.errors.password && formik.touched.password && (
                        <p className="error__schema">
                            {formik.errors.password}
                        </p>
                    )}
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={formik.values.confirmPassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        name="confirmPassword"
                    />
                    {formik.errors.confirmPassword &&
                        formik.touched.confirmPassword && (
                            <p className="error__schema">
                                {formik.errors.confirmPassword}
                            </p>
                        )}
                    <button type="submit" disabled={isLoading}>
                        {isLoading ? "Loading..." : "Sign up"}
                    </button>
                </form>
            )}
        </>
    );
};

export default SignUpForm;
