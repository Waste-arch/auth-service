import React from "react";
import "../Assets/Styles/AuthForm.css";
import useChangePassword from "../Hooks/useChangePassword";

const ChangePasswordForm = () => {
    const { formik, isLoading } = useChangePassword();
    return (
        <form className="form" onSubmit={formik.handleSubmit}>
            <h2>Change password</h2>
            <input
                type="password"
                placeholder="Your old password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="password"
            />
            {formik.errors.password && formik.touched.password && (
                <p className="error__schema">{formik.errors.password}</p>
            )}
            <input
                type="password"
                placeholder="Your new password"
                value={formik.values.newPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="newPassword"
            />
            {formik.errors.newPassword && formik.touched.newPassword && (
                <p className="error__schema">{formik.errors.newPassword}</p>
            )}
            <button type="submit" disabled={isLoading}>
                {isLoading ? "Loading..." : "Change password"}
            </button>
        </form>
    );
};

export default ChangePasswordForm;
