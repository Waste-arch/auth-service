import React from "react";
import "../Assets/Styles/AuthForm.css";
import useLoginForm from "../Hooks/useLogin.js";
import { useAuthContext } from "../Hooks/useAuthContext.js";

const LoginForm = () => {
    const { formik, isLoading } = useLoginForm();
    const { user } = useAuthContext();
    return (
        <>
            {user ? (
                <h1 style={{ textAlign: "center" }}>No access to login page</h1>
            ) : (
                <form className="form" onSubmit={formik.handleSubmit}>
                    <h2>Login</h2>
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
                    <button type="submit" disabled={isLoading}>
                        {isLoading ? "Loading..." : "Login"}
                    </button>
                </form>
            )}
        </>
    );
};

export default LoginForm;
