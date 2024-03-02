import * as yup from "yup";

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

export const SignupSchema = yup.object().shape({
    email: yup
        .string()
        .email("Please enter a valid email")
        .required("Required"),
    username: yup.string().required("Required").min(4),
    password: yup
        .string()
        .min(5)
        .matches(passwordRules, {
            message: "Please create a stronger password",
        })
        .required("Required"),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref("password"), null], "Passwords must match")
        .required("Required"),
});

export const LoginSchema = yup.object().shape({
    email: yup
        .string()
        .email("Please enter a valid email")
        .required("Required"),
    password: yup
        .string()
        .min(5)
        .matches(passwordRules, {
            message: "Please create a stronger password",
        })
        .required("Required"),
});

export const ChangePasswordSchema = yup.object().shape({
    password: yup
        .string()
        .min(5)
        .matches(passwordRules, {
            message: "Please create a stronger password",
        })
        .required("Required"),
    newPassword: yup
        .string()
        .min(5)
        .matches(passwordRules, {
            message: "Please create a stronger password",
        })
        .required("Required"),
});
