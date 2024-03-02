import { useState } from "react";

export default function useUploadFile() {
    const [isLoading, setIsLoading] = useState();

    const uploadFile = async () => {
        setIsLoading(true);
        console.log("Protected operation with JWT");
        setIsLoading(false);
    };

    return { uploadFile, isLoading };
}
