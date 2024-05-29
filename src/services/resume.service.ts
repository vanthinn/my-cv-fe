import { IResume } from "../types/IResume";
import BaseURL from "../utils/BaseURL";

const getAllResume = () => {
    return BaseURL({
        url: `/users/cv`,
        method: "GET",
    });
};

const createResume = (data: IResume) => {
    return BaseURL({
        url: `/cv`,
        method: "POST",
        data
    });
}

const patchResume = (params: any) => {
    const { id, data } = params
    return BaseURL({
        url: `/cv/${id}`,
        method: "PATCH",
        data,
    });
}

const getCVById = (id: string) => {
    return BaseURL({
        url: `/cv/${id}`,
        method: "GET",
    });
}

const updateCV = (data: IResume) => {
    return BaseURL({
        url: `/cv/` + data.id,
        method: "PUT",
        data
    });
}

const deleteCV = (id: string) => {
    return BaseURL({
        url: `/cv/${id}`,
        method: "DELETE",
    });
}

export { getAllResume, createResume, patchResume, getCVById, updateCV, deleteCV }