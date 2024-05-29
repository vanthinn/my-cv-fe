import { postImage } from '../../services/image.service';
import { editUser, getCurrentUser, getHistoryApply } from '../../services/user.service';
import { IUser, IUserEdit } from './../../types/IUser';
import { persist, action, Action, thunk, Thunk } from "easy-peasy";

export interface IUserModel {
    //MessageError
    messageErrorUser: string;
    setMessageErrorUser: Action<IUserModel, string>;

    //GetCurrentUser
    currentUserSuccess: null | IUser;
    setCurrentUserSuccess: Action<IUserModel, IUser | null>;

    isGetCurrentUserSuccess: boolean;
    setIsGetCurrentUserSuccess: Action<IUserModel, boolean>;
    getCurrentUser: Thunk<IUserModel, undefined>;

    //PostImage
    isPostImageSuccess: boolean;
    setIsPostImageSuccess: Action<IUserModel, boolean>;
    postImage: Thunk<IUserModel, any>;

    //editUser
    isEditUserSuccess: boolean;
    setIsEditUserSuccess: Action<IUserModel, boolean>;
    editEdit: Thunk<IUserModel, IUserEdit>;

    //getHistoryApply
    isGetHistoryApplySuccess: boolean;
    setIsGetHistoryApplySuccess: Action<IUserModel, boolean>;
    getHistoryApply: Thunk<IUserModel, undefined>;
}

export const userModel: IUserModel = persist({
    //MessageError
    messageErrorUser: "",
    setMessageErrorUser: action((state, payload) => {
        state.messageErrorUser = payload;
    }),

    //GetCurrentUser
    currentUserSuccess: null,
    setCurrentUserSuccess: action((state, payload) => {
        state.currentUserSuccess = payload;
    }),
    isGetCurrentUserSuccess: true,
    setIsGetCurrentUserSuccess: action((state, payload) => {
        state.isGetCurrentUserSuccess = payload;
    }),
    getCurrentUser: thunk(async (actions) => {
        return getCurrentUser()
            .then(async (res) => {
                actions.setIsGetCurrentUserSuccess(true)
                actions.setCurrentUserSuccess(res.data)
                return res.data;
            })
            .catch((error) => {
                actions.setIsGetCurrentUserSuccess(false)
                actions.setCurrentUserSuccess(null)
                actions.setMessageErrorUser(error?.response?.data?.message)
            });
    }),

    //PostImage
    isPostImageSuccess: true,
    setIsPostImageSuccess: action((state, payload) => {
        state.isPostImageSuccess = payload;
    }),
    postImage: thunk(async (actions, payload) => {
        return postImage(payload)
            .then(async (res) => {
                actions.setIsPostImageSuccess(true)
                return res.data;
            })
            .catch((error) => {
                console.log(error)
                actions.setIsPostImageSuccess(false)
                actions.setMessageErrorUser(error?.response?.data?.message)
            });
    }),

    //editUser
    isEditUserSuccess: true,
    setIsEditUserSuccess: action((state, payload) => {
        state.isEditUserSuccess = payload;
    }),
    editEdit: thunk(async (actions, payload) => {
        return editUser(payload)
            .then(async (res) => {
                actions.setIsEditUserSuccess(true)
                return res;
            })
            .catch((error) => {
                actions.setIsEditUserSuccess(false)
                actions.setMessageErrorUser(error?.response?.data?.message)
            });
    }),

    isGetHistoryApplySuccess: true,
    setIsGetHistoryApplySuccess: action((state, payload) => {
        state.isGetHistoryApplySuccess = payload;
    }),
    getHistoryApply: thunk(async (actions) => {
        return getHistoryApply()
            .then(async (res) => {
                actions.setIsGetHistoryApplySuccess(true)
                return res.data;
            })
            .catch((error) => {
                actions.setIsGetHistoryApplySuccess(false)
                actions.setMessageErrorUser(error?.response?.data?.message)
            });
    }),
})