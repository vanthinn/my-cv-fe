import { ICompany } from "../types/ICompany";
import BaseURL from "../utils/BaseURL";

const getAllCompany = (params: any) => {
    return BaseURL({
        url: `/company`,
        method: "GET",
        params,
    });
};

const getCompanyById = (id: string) => {
    return BaseURL({
        url: `/company/${id}`,
        method: "GET",
    });
};

const updateCompany = (data: ICompany) => {
    return BaseURL({
        url: `/company/${data.id}`,
        method: "PUT",
        data,
    });
}

const chooseCompany = (data: { id: string }) => {
    return BaseURL({
        url: `/users/company`,
        method: "PATCH",
        data,
    });
}

export { getAllCompany, getCompanyById, updateCompany, chooseCompany }
