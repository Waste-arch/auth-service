import React from "react";
import "../Assets/Styles/FileForm.css";
import useUploadFile from "../Hooks/useUploadFile";
import { useState } from "react";

export default function FileForm() {
    const { uploadFile, isLoading } = useUploadFile();

    const [image, setImage] = useState({});

    console.log(image);

    return (
        <div>
            <h1 style={{ textAlign: "center" }}>Auth service</h1>
            <div className="file-form">
                <button onClick={() => uploadFile()} disabled={isLoading}>
                    {isLoading ? "Uploading..." : "Upload file"}
                </button>
            </div>
        </div>
    );
}
