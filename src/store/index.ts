import {
    createStore,
    createTypedHooks,
    StateMapper,
    ActionMapper,
} from "easy-peasy";
import { IResumeModel, resumeModel as resume } from "./models/resume";



export interface IStoreModel {
    resume: IResumeModel


}

const storeModel: IStoreModel = {
    resume,
}

export const { useStoreActions, useStoreState, useStoreDispatch, useStore } =
    createTypedHooks<IStoreModel>();

interface IStateMapper extends StateMapper<IStoreModel> { }
interface IActionMapper extends ActionMapper<IStoreModel, keyof IStoreModel> { }

// Auth


// Resume
export const resumeStateSelector = (state: IStateMapper) => state.resume;
export const resumeActionSelector = (state: IActionMapper) => state.resume;

const store = createStore(storeModel, {
    name: "store",
    // middleware,
});

export default store;