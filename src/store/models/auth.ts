import { persist, action, Action, Thunk, thunk } from "easy-peasy";

import { IUser, IUserLogin } from "../../types/IUser";
import { changePassword, forgotPassword, login, resetPassword, signUp } from "../../services/auth.service";

// import { Socket } from 'socket.io-client';

export interface IAuthModel {
    //MessageError
    messageError: string;
    setMessageError: Action<IAuthModel, string>;

    //isAccessToken
    accessToken: string;
    setAccessToken: Action<IAuthModel, string>

    //Socket
    // socket: any
    // setSocket: Action<IAuthModel, any>

    //Login
    isLoginSuccess: boolean;
    setIsLoginSuccess: Action<IAuthModel, boolean>;
    login: Thunk<IAuthModel, IUserLogin>;

    //Logout
    isLogoutSuccess: boolean;
    setIsLogoutSuccess: Action<IAuthModel, boolean>;

    //SignUp
    isSignUpSuccess: boolean;
    setIsSignUpSuccess: Action<IAuthModel, boolean>;
    signUp: Thunk<IAuthModel, IUser>;

    //ForgotPassword
    isForgotPasswordSuccess: boolean;
    setIsForgotPasswordSuccess: Action<IAuthModel, boolean>;
    forgotPassword: Thunk<IAuthModel, { email: string, tenantId: string }>;

    //ResetPassword
    isResetPasswordSuccess: boolean;
    setIsResetPasswordSuccess: Action<IAuthModel, boolean>;
    resetPassword: Thunk<IAuthModel, any>;

    //ChangePassword
    isChangePasswordSuccess: boolean;
    setIsChangePasswordSuccess: Action<IAuthModel, boolean>;
    changePassword: Thunk<IAuthModel, any>;
}

export const authModel: IAuthModel = persist({
    //MessageError
    messageError: "",
    setMessageError: action((state, payload) => {
        state.messageError = payload;
    }),
    //accessToken
    accessToken: '',
    setAccessToken: action((state, payload) => {
        state.accessToken = payload;
    }),

    // socket: null,
    // setSocket: action((state, payload) => {
    //     state.socket = payload;
    // }),

    //Login
    isLoginSuccess: true,
    setIsLoginSuccess: action((state, payload) => {
        state.isLoginSuccess = payload;
    }),
    login: thunk(async (actions, payload) => {
        return login(payload)
            .then(async (res) => {
                actions.setAccessToken(res.data?.accessToken)
                localStorage.setItem('auth', JSON.stringify(res.data))
                actions.setIsLoginSuccess(true)
                actions.setMessageError('')
                return res.data;
            })
            .catch((error) => {
                actions.setIsLoginSuccess(false)
                actions.setMessageError(error?.response?.data?.message)
            });
    }),

    //Logout
    isLogoutSuccess: false,
    setIsLogoutSuccess: action((state, payload) => {
        state.isLogoutSuccess = payload;
    }),

    //Signup
    isSignUpSuccess: true,
    setIsSignUpSuccess: action((state, payload) => {
        state.isSignUpSuccess = payload;
    }),
    signUp: thunk(async (actions, payload) => {
        return signUp(payload)
            .then(async (res) => {
                // actions.setAccessToken(res.data?.accessToken)
                // localStorage.setItem('auth', JSON.stringify(res.data))
                actions.setIsSignUpSuccess(true)
                actions.setMessageError('')
                return res.data;
            })
            .catch((error) => {
                actions.setIsSignUpSuccess(false)
                actions.setMessageError(error?.response?.data?.message)
            });
    }),

    //ForgotPassword
    isForgotPasswordSuccess: true,
    setIsForgotPasswordSuccess: action((state, payload) => {
        state.isForgotPasswordSuccess = payload;
    }),
    forgotPassword: thunk(async (actions, payload) => {
        return forgotPassword(payload)
            .then(async (res) => {
                actions.setIsForgotPasswordSuccess(true)
                actions.setMessageError('')
                return res;
            })
            .catch((error) => {
                actions.setIsForgotPasswordSuccess(false)
                actions.setMessageError(error?.response?.data?.message)
            });
    }),

    //ResetPassword
    isResetPasswordSuccess: true,
    setIsResetPasswordSuccess: action((state, payload) => {
        state.isResetPasswordSuccess = payload;
    }),
    resetPassword: thunk(async (actions, payload) => {
        return resetPassword(payload)
            .then(async (res) => {
                actions.setIsResetPasswordSuccess(true)
                return res;
            })
            .catch((error) => {
                actions.setIsResetPasswordSuccess(false)
                actions.setMessageError(error?.response?.data?.message)
            });
    }),

    //ChangePassword
    isChangePasswordSuccess: true,
    setIsChangePasswordSuccess: action((state, payload) => {
        state.isChangePasswordSuccess = payload;
    }),
    changePassword: thunk(async (actions, payload) => {
        return changePassword(payload)
            .then(async (res) => {
                actions.setIsChangePasswordSuccess(true)
                return res;
            })
            .catch((error) => {
                actions.setIsChangePasswordSuccess(false)
                actions.setMessageError(error?.response?.data?.message)
            });
    }),
})
