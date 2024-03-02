import { useFormik } from "formik";
import { LoginSchema } from "../Schemas/index";
import UserService from "../Service/authService.js";
import { useState } from "react";
import { useAuthContext } from "../Hooks/useAuthContext.js";
import { useNavigate } from "react-router-dom";

const useLoginForm = () => {
    const { dispatch } = useAuthContext();
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: LoginSchema,
        onSubmit: async (values) => {
            setIsLoading(true);

            const data = await UserService.loginUser(values);

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

export default useLoginForm;
