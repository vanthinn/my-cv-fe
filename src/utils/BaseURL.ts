import axios from "axios";
import { isTokenRequired } from "./functions";

const BaseURL = axios.create({
    baseURL: `${import.meta.env.VITE_REACT_APP_API_URL}`,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

BaseURL.interceptors.request.use(
    async (config) => {
        const auth: any = JSON.parse(String(localStorage.getItem("auth")));
        if (auth?.accessToken && isTokenRequired(config.url || '')) {
            config.headers.Authorization = `Bearer ${auth.accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

BaseURL.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalConfig = error.config;
        if (originalConfig.url !== "/auth/login" && error.response) {
            if (error.response.status === 401 && !originalConfig._retry) {
                originalConfig._retry = true;
                const auth: any = JSON.parse(String(localStorage.getItem("auth")));
                if (auth) {
                    localStorage.removeItem('auth');
                    // const resp = await refreshToken();
                    // if (resp) {
                    //     localStorage.setItem('auth', JSON.stringify(resp.data));
                    //     const accessToken = resp.data.accessToken;
                    //     BaseURL.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
                    //     return BaseURL(originalConfig);
                    // }
                } else {
                    originalConfig._retry = false;
                }
            }
        }
        return Promise.reject(error);
    }
);

// const refreshToken = async () => {
//     try {
//         const auth: any = JSON.parse(String(localStorage.getItem("auth")));
//         const resp = await BaseURL.get("/auth/refresh", {
//             headers: {
//                 Authorization: `Bearer ${auth?.refreshToken}`
//             }
//         });
//         localStorage.setItem('auth', JSON.stringify(resp.data));
//         return resp;
//     } catch (error) {
//         localStorage.removeItem('auth');
//         console.error("Error refreshing token", error);
//         return null;
//     }
// };

export default BaseURL;
