import { notification } from "antd";
import codeMessage from "./codeMessage.js";

export default class ResponseHandler {
    static handleError(error) {
        if (!navigator.onLine) {
            notification.config({
                duration: 15,
                maxCount: 1,
            });
            notification.error({
                message: "No internet connection",
                description:
                    "Cannot connect to the Internet, Check your internet network",
            });
            return {
                success: false,
                result: null,
                message:
                    "Cannot connect to the server, Check your internet network",
            };
        }

        const { response } = error;

        if (!response) {
            notification.config({
                duration: 20,
                maxCount: 1,
            });
            notification.error({
                message: "Problem connecting to server",
                description: "Cannot connect to the server, Try again later",
            });
            return {
                success: false,
                result: null,
                message:
                    "Cannot connect to the server, Contact your Account administrator",
            };
        }

        if (response && response.data && response.data.jwtExpired) {
            const result = window.localStorage.getItem("auth");
            const jsonFile = window.localStorage.getItem("isLogout");
            const { isLogout } = (jsonFile && JSON.parse(jsonFile)) || false;
            window.localStorage.removeItem("auth");
            window.localStorage.removeItem("isLogout");
            if (result || isLogout) {
                window.location.href = "/logout";
            }
        }

        if (response && response.status) {
            const message = response.data && response.data.message;
            const errorText =
                message || codeMessage[response.status.toString()];
            const { status } = response;
            notification.config({
                duration: 20,
                maxCount: 2,
            });
            notification.error({
                message: `Request error ${status}`,
                description: errorText,
            });
            return response.data;
        } else {
            notification.config({
                duration: 15,
                maxCount: 1,
            });

            if (navigator.onLine) {
                notification.error({
                    message: "Problem connecting to server",
                    description:
                        "Cannot connect to the server, Try again later",
                });
                return {
                    success: false,
                    result: null,
                    message:
                        "Cannot connect to the server, Contact your Account administrator",
                };
            } else {
                notification.error({
                    message: "No internet connection",
                    description:
                        "Cannot connect to the Internet, Check your internet network",
                });
                return {
                    success: false,
                    result: null,
                    message:
                        "Cannot connect to the server, Check your internet network",
                };
            }
        }
    }
    static handleSuccess(
        response,
        options = {
            notifyOnSuccess: false,
            notifyOnFailed: true,
        }
    ) {
        const { data } = response;
        if (data && data.success) {
            const message = response.data && data.message;
            const successText =
                message || codeMessage[response.status?.toString() || ""];

            if (options.notifyOnSuccess) {
                notification.config({
                    duration: 2,
                    maxCount: 2,
                });
                notification.success({
                    message: `Request success`,
                    description: successText,
                });
            }
        } else {
            const message = response.data && data.message;
            const errorText =
                message || codeMessage[response.status?.toString() || ""];
            const { status } = response;
            if (options.notifyOnFailed) {
                notification.config({
                    duration: 4,
                    maxCount: 2,
                });
                notification.error({
                    message: `Request error ${status}`,
                    description: errorText,
                });
            }
        }
    }
}
