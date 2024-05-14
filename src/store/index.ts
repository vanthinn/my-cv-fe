import {
    createStore,
    createTypedHooks,
    StateMapper,
    ActionMapper,
} from "easy-peasy";
import { IResumeModel, resumeModel as resume } from "./models/resume";
import { ICompanyModel, companyModel as company } from "./models/company";



export interface IStoreModel {
    resume: IResumeModel
    company: ICompanyModel


}

const storeModel: IStoreModel = {
    resume,
    company
}

export const { useStoreActions, useStoreState, useStoreDispatch, useStore } =
    createTypedHooks<IStoreModel>();

interface IStateMapper extends StateMapper<IStoreModel> { }
interface IActionMapper extends ActionMapper<IStoreModel, keyof IStoreModel> { }

// Auth


// Resume
export const resumeStateSelector = (state: IStateMapper) => state.resume;
export const resumeActionSelector = (state: IActionMapper) => state.resume;

//Company
export const companyStateSelector = (state: IStateMapper) => state.company;
export const companyActionSelector = (state: IActionMapper) => state.company;

const store = createStore(storeModel, {
    name: "store",
    // middleware,
});

export default store;