import { ICompany } from "./ICompany";
import { IUser } from "./IUser";

export interface IRecruitmentRequest {
    id?: string;
    title: string;
    salary: string,
    jobType: string
    experience: string
    description: string
    workTime?: string
    education?: string
    skills?: string[]
    deadline: string
}

export interface IRecruitmentResponse extends IRecruitmentRequest {
    createdAt?: string
    updatedAt?: string
    createdBy: IUser
    company: ICompany
}