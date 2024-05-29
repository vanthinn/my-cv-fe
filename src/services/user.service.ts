import { IUserEdit } from "../types/IUser";
import BaseURL from "../utils/BaseURL";

const getCurrentUser = () => {
    return BaseURL({
        url: `/users/profile`,
        method: "GET",
    });
}
const editUser = (data: IUserEdit) => {
    return BaseURL({
        url: `/users/` + data.id,
        method: "PUT",
        data,
    });
}

const getHistoryApply = () => {
    return BaseURL({
        url: `/users/job-apply/history`,
        method: "GET",
    });
}

export { getCurrentUser, editUser, getHistoryApply }