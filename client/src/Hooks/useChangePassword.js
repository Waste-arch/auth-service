import UserService from "../Service/authService";
import { useAuthContext } from "../Hooks/useAuthContext.js";
import { useState } from "react";
import { useFormik } from "formik";
import { ChangePasswordSchema } from "../Schemas/index";
import useLogout from "./useLogout.js";

export default function useChangePassword() {
    const { dispatch } = useAuthContext();
    const { user } = useAuthContext();
    const [isLoading, setIsLoading] = useState(false);
    const { logout } = useLogout();

    const token = user ? user.accessToken : null;

    const formik = useFormik({
        initialValues: {
            password: "",
            newPassword: "",
        },
        validationSchema: ChangePasswordSchema,
        onSubmit: async (values, { resetForm }) => {
            setIsLoading(true);

            const jsonData = {
                email: user.email,
                ...values,
            };

            const data = await UserService.changePassword(token, jsonData);

            if (data.success) {
                localStorage.setItem("user", JSON.stringify(data));
                dispatch({ type: "LOGIN", payload: data });
                setIsLoading(false);
                resetForm();
                logout();
            }

            setIsLoading(false);
        },
    });

    return { formik, isLoading };
}
