import { AuthContext } from "../Context/context";
import { useContext } from "react";

export const useAuthContext = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw Error(
            "useAuthContext mush be used inside an AuthContextProvider"
        );
    }

    return context;
};
