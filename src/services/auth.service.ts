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

export { login, signUp }