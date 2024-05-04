import { persist, action, Action, Thunk, thunk } from "easy-peasy";
import { IResume } from "../../types/IResume";

export interface IResumeModel {

    //ResumeData
    resumeData: IResume | any;
    setResumeData: Action<IResumeModel, IResume | any>

}

export const resumeModel: IResumeModel = persist({
    //ResumeData
    resumeData: undefined,
    setResumeData: action((state, payload) => {
        state.resumeData = payload;
    }),


})