import { persist, action, Action, Thunk, thunk } from "easy-peasy";
import { IResume } from "../../types/IResume";
import { createResume, deleteCV, getAllResume, getCVById, patchResume, updateCV } from "../../services/resume.service";

export interface IResumeModel {
    //MessageError
    messageErrorResume: string;
    setMessageErrorResume: Action<IResumeModel, string>;


    //ResumeData
    resumeData: IResume | any;
    setResumeData: Action<IResumeModel, IResume | any>

    //getALlResumeUser
    isGetAllResumeUserSuccess: boolean;
    setIsGetAllResumeUserSuccess: Action<IResumeModel, boolean>;
    getAllResumeUser: Thunk<IResumeModel, undefined>;

    //createResume
    isCreateResumeSuccess: boolean;
    setIsCreateResumeSuccess: Action<IResumeModel, boolean>;
    createResume: Thunk<IResumeModel, IResume>;

    //patchResume
    isPatchResumeSuccess: boolean;
    setIsPatchResumeSuccess: Action<IResumeModel, boolean>;
    patchResume: Thunk<IResumeModel, { id: string, data: any }>;

    //getCVById
    isGetCVByIdSuccess: boolean;
    setIsGetCVByIdSuccess: Action<IResumeModel, boolean>;
    getCVById: Thunk<IResumeModel, string>;

    //UpdateCV
    isUpdateCVSuccess: boolean;
    setIsUpdateCVByIdSuccess: Action<IResumeModel, boolean>;
    updateCV: Thunk<IResumeModel, IResume>;

    //DeleteCV
    isDeleteCVSuccess: boolean;
    setIsDeleteCVSuccess: Action<IResumeModel, boolean>;
    deleteCV: Thunk<IResumeModel, string>;

}

export const resumeModel: IResumeModel = persist({
    //MessageError
    messageErrorResume: "",
    setMessageErrorResume: action((state, payload) => {
        state.messageErrorResume = payload;
    }),


    //ResumeData
    resumeData: undefined,
    setResumeData: action((state, payload) => {
        state.resumeData = payload;
    }),

    isGetAllResumeUserSuccess: true,
    setIsGetAllResumeUserSuccess: action((state, payload) => {
        state.isGetAllResumeUserSuccess = payload;
    }),
    getAllResumeUser: thunk(async (actions) => {
        return getAllResume()
            .then(async (res) => {
                actions.setIsGetAllResumeUserSuccess(true)
                return res.data;
            })
            .catch((error) => {
                actions.setIsGetAllResumeUserSuccess(false)
                actions.setMessageErrorResume(error?.response?.data?.message)
            });
    }),

    isCreateResumeSuccess: true,
    setIsCreateResumeSuccess: action((state, payload) => {
        state.isCreateResumeSuccess = payload;
    }),
    createResume: thunk(async (actions, payload) => {
        return createResume(payload)
            .then(async (res) => {
                actions.setIsCreateResumeSuccess(true)
                return res.data;
            })
            .catch((error) => {
                actions.setIsCreateResumeSuccess(false)
                actions.setMessageErrorResume(error?.response?.data?.message[0])
            });
    }),

    isPatchResumeSuccess: true,
    setIsPatchResumeSuccess: action((state, payload) => {
        state.isPatchResumeSuccess = payload;
    }),
    patchResume: thunk(async (actions, payload) => {
        return patchResume(payload)
            .then(async (res) => {
                actions.setIsPatchResumeSuccess(true)
                return res;
            })
            .catch((error) => {
                actions.setIsPatchResumeSuccess(false)
                actions.setMessageErrorResume(error?.response?.data?.message[0])
            });
    }),

    isGetCVByIdSuccess: true,
    setIsGetCVByIdSuccess: action((state, payload) => {
        state.isGetCVByIdSuccess = payload;
    }),
    getCVById: thunk(async (actions, payload) => {
        return getCVById(payload)
            .then(async (res) => {
                actions.setIsGetCVByIdSuccess(true)
                return res.data;
            })
            .catch((error) => {
                actions.setIsGetCVByIdSuccess(false)
                actions.setMessageErrorResume(error?.response?.data?.message[0])
            });
    }),

    isUpdateCVSuccess: true,
    setIsUpdateCVByIdSuccess: action((state, payload) => {
        state.isUpdateCVSuccess = payload;
    }),
    updateCV: thunk(async (actions, payload) => {
        return updateCV(payload)
            .then(async (res) => {
                actions.setIsUpdateCVByIdSuccess(true)
                return res;
            })
            .catch((error) => {
                actions.setIsUpdateCVByIdSuccess(false)
                actions.setMessageErrorResume(error?.response?.data?.message[0])
            });
    }),

    isDeleteCVSuccess: true,
    setIsDeleteCVSuccess: action((state, payload) => {
        state.isDeleteCVSuccess = payload;
    }),
    deleteCV: thunk(async (actions, payload) => {
        return deleteCV(payload)
            .then(async (res) => {
                actions.setIsDeleteCVSuccess(true)
                return res;
            })
            .catch((error) => {
                actions.setIsDeleteCVSuccess(false)
                actions.setMessageErrorResume(error?.response?.data?.message)
            });
    }),
})