import { IUser, IUserLogin } from "../types/IUser";
import BaseURL from "../utils/BaseURL";

const login = (data: IUserLogin) => {
    return BaseURL({
        url: `/auth/login`,
        method: "POST",
        data,
    });
};

const signUp = (data: IUser) => {
    return BaseURL({
        url: `/auth/signUp`,
        method: "POST",
        data,
    });
};

const forgotPassword = (data: { email: string, tenantId: string }) => {
    return BaseURL({
        url: `/auth/forgot-password`,
        method: "POST",
        data,
    });
};

const resetPassword = (data: any) => {
    return BaseURL({
        url: `/auth/reset-password`,
        method: "POST",
        data,
    });
};

const changePassword = (data: any) => {
    return BaseURL({
        url: `/auth/change-password`,
        method: "POST",
        data,
    });
}

export { login, signUp, forgotPassword, resetPassword, changePassword }