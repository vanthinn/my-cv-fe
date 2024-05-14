import { persist, action, Action, Thunk, thunk } from "easy-peasy";
import { ICompany } from "../../types/ICompany";

export interface ICompanyModel {
    //setCompany
    company: ICompany | null;
    setCompany: Action<ICompanyModel, ICompany | null>


}

export const companyModel: ICompanyModel = persist({
    //setCompany
    company: null,
    setCompany: action((state, payload) => {
        state.company = payload;
    }),
})