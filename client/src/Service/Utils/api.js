import axios from "axios";
import config from "../../Config/config.js";

const api = axios.create({
    baseURL: config.baseURL,
    timeout: 10000,
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Authorization",
    },
});

export default api;
