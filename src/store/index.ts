import {
    createStore,
    createTypedHooks,
    StateMapper,
    ActionMapper,
} from "easy-peasy";
import { IResumeModel, resumeModel as resume } from "./models/resume";
import { ICompanyModel, companyModel as company } from "./models/company";
import { authModel as auth, IAuthModel } from "./models/auth";
import { notifyModel as notify, INotifyModel } from "./models/notify";
import { userModel as user, IUserModel } from "./models/user";
import { jobModel as job, IJobModel } from "./models/job";
import { bookmarkModel as bookmark, IBookmarkModel } from "./models/bookmark";

export interface IStoreModel {
    resume: IResumeModel
    company: ICompanyModel
    auth: IAuthModel;
    notify: INotifyModel;
    user: IUserModel
    job: IJobModel
    bookmark: IBookmarkModel
}

const storeModel: IStoreModel = {
    auth,
    notify,
    resume,
    company,
    user,
    job,
    bookmark,
}

export const { useStoreActions, useStoreState, useStoreDispatch, useStore } =
    createTypedHooks<IStoreModel>();

interface IStateMapper extends StateMapper<IStoreModel> { }
interface IActionMapper extends ActionMapper<IStoreModel, keyof IStoreModel> { }

// Auth
export const authStateSelector = (state: IStateMapper) => state.auth;
export const authActionSelector = (state: IActionMapper) => state.auth;

// Notify
export const notifyStateSelector = (state: IStateMapper) => state.notify;
export const notifyActionSelector = (state: IActionMapper) => state.notify;

// Resume
export const resumeStateSelector = (state: IStateMapper) => state.resume;
export const resumeActionSelector = (state: IActionMapper) => state.resume;

//Company
export const companyStateSelector = (state: IStateMapper) => state.company;
export const companyActionSelector = (state: IActionMapper) => state.company;

//user
export const userStateSelector = (state: IStateMapper) => state.user;
export const userActionSelector = (state: IActionMapper) => state.user;

//job
export const jobStateSelector = (state: IStateMapper) => state.job;
export const jobActionSelector = (state: IActionMapper) => state.job;

//bookmark
export const bookmarkStateSelector = (state: IStateMapper) => state.bookmark;
export const bookmarkActionSelector = (state: IActionMapper) => state.bookmark;

const store = createStore(storeModel, {
    name: "store",
    // middleware,
});

export default store;