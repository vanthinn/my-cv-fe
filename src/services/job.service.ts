import { IRecruitmentRequest } from "../types/IRecruitment";
import BaseURL from "../utils/BaseURL";

const getAllJobOffer = (params: any) => {
    return BaseURL({
        url: `/job-offer`,
        method: "GET",
        params,
    });
}

const getJobById = (params: { jobId: string, userId?: string }) => {
    return BaseURL({
        url: `/job-offer/job-detail`,
        method: "GET",
        params
    });
}

const applyJob = (data: { jobId: string }) => {
    return BaseURL({
        url: `/job-apply`,
        method: "POST",
        data
    });
}

const createJob = (data: IRecruitmentRequest) => {
    return BaseURL({
        url: `/job-offer`,
        method: "POST",
        data,
    });
}

const updateJob = (data: IRecruitmentRequest) => {
    return BaseURL({
        url: `/job-offer/${data.id}`,
        method: "PUT",
        data,
    });
}

const getJoBApplyByJobId = (data: { id: string, params: any }) => {
    const { id, params } = data;
    return BaseURL({
        url: `/job-apply/job/` + id,
        method: "GET",
        params
    });
}

const deleteJobApply = (id: string) => {
    return BaseURL({
        url: `/job-apply/` + id,
        method: "DELETE",
    });
}

const getAllJobApply = (params: any) => {
    return BaseURL({
        url: `/job-apply`,
        method: "GET",
        params,
    });
}

const updateStatusJobApply = (data: { id: string, status: string }) => {
    return BaseURL({
        url: `/job-apply/update-status`,
        method: "PATCH",
        data,
    });
}


const deleteJobOffer = (id: string) => {
    return BaseURL({
        url: `/job-offer/` + id,
        method: "DELETE",
    });
}


export { getAllJobOffer, getJobById, applyJob, createJob, updateJob, getJoBApplyByJobId, deleteJobApply, getAllJobApply, updateStatusJobApply, deleteJobOffer }