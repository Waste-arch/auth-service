import { useNavigate } from "react-router-dom";
import UserService from "../Service/authService";
import { useAuthContext } from "../Hooks/useAuthContext.js";
import { useState } from "react";

export default function useLogout() {
    const navigate = useNavigate();
    const { dispatch } = useAuthContext();
    const { user } = useAuthContext();
    const [isLoading, setIsLoading] = useState(false);

    const token = user ? user.accessToken : null;

    const logout = async () => {
        setIsLoading(true);
        const data = await UserService.logoutUser(token);

        localStorage.removeItem("user");
        dispatch({ type: "LOGOUT" });

        navigate("/login");
        setIsLoading(false);
    };

    return { logout, isLoading }; 
}
