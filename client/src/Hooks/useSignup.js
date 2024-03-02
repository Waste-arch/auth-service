import { useFormik } from "formik";
import { SignupSchema } from "../Schemas/index.js";
import UserService from "../Service/authService.js";
import { useAuthContext } from "../Hooks/useAuthContext.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useSignUp = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { dispatch } = useAuthContext();

    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
        validationSchema: SignupSchema,
        onSubmit: async (values) => {
            setIsLoading(true);

            const data = await UserService.createUser(values);

            if (data) {
                setIsLoading(false);
            }

            if (data.success) {
                localStorage.setItem("user", JSON.stringify(data));
                dispatch({ type: "LOGIN", payload: data });
                navigate("/profile");
            }
        },
    });

    return { formik, isLoading };
};

export default useSignUp;
