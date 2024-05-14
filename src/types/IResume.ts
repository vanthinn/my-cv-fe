import { IRecruitmentResponse } from "./IRecruitment";

export interface IResume {
    id?: string;
    template?: string;
    title?: string;
    fontStyle?: string;
    fontWeight?: string;
    color?: string;
    profile: IProfileCV
    education: IEducation
    experiences?: IExperience[]
    skills?: string[]
    languages?: ILanguage[]
    interests?: string[]
    summary?: string
    certifications?: ICertification[]
}

export interface IProfileCV {
    id?: string;
    firstName: string;
    lastName: string;
    gender: string;
    dateOfBirth: string;
    address?: string;
    phoneNumber: string;
    email: string;
    avatarUrl: string;
    facebook?: string;
    linkedin?: string;
}

export interface IEducation {
    id?: string;
    schoolName: string;
    location: string;
    fieldOfStudy: string;
    state: string;
    GPA?: string
    graduationStartDate: string;
    graduationEndDate: string;
}

export interface IExperience {
    id?: string
    position: string;
    company: string
    location: string;
    state?: boolean
    startDate: string;
    endDate: string;
    description?: string;
}

export interface ILanguage {
    id?: string
    displayName: string
    level: string
}

export interface ICertification {
    id?: string
    displayName: string
    dateTime: string
}

export interface IResumeApply {
    id?: string,
    fullName?: string
    job: IRecruitmentResponse
    cv: IResume
    createdAt?: string
    updatedAt?: string
    status?: string

}
