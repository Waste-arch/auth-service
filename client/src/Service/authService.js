import api from "./Utils/api.js";
import ResponseHandler from "./responseHandler.js";

export default class UserService {
    static async createUser(jsonData) {
        try {
            const response = await api.post("/register", jsonData);
            ResponseHandler.handleSuccess(response, {
                notifyOnSuccess: true,
                notifyOnFailed: true,
            });
            return response.data;
        } catch (error) {
            return ResponseHandler.handleError(error);
        }
    }
    static async loginUser(jsonData) {
        try {
            const response = await api.post("/login", jsonData);
            ResponseHandler.handleSuccess(response, {
                notifyOnSuccess: true,
                notifyOnFailed: true,
            });
            return response.data;
        } catch (error) {
            return ResponseHandler.handleError(error);
        }
    }
    static async logoutUser(token) {
        try {
            const response = await api.post(
                "/logout",
                {},
                {
                    headers: {
                        ...api.defaults.headers,
                        Authorization: "Bearer " + token,
                    },
                }
            );
            ResponseHandler.handleSuccess(response, {
                notifyOnSuccess: true,
                notifyOnFailed: true,
            });
            return response.data;
        } catch (error) {
            return ResponseHandler.handleError(error);
        }
    }
    static async changePassword(token, data) {
        try {
            const response = await api.patch(
                "/password",
                data,
                {
                    headers: {
                        ...api.defaults.headers,
                        Authorization: "Bearer " + token,
                    },
                }
            );
            ResponseHandler.handleSuccess(response, {
                notifyOnSuccess: true,
                notifyOnFailed: true,
            });
            return response.data;
        } catch (error) {
            return ResponseHandler.handleError(error);
        }
    }
}

//peqiq@mailinator.com
//1732dstp!D
