import BaseURL from "../utils/BaseURL";

const bookmark = (data: { id: string }) => {
    return BaseURL({
        url: `/bookmark`,
        method: "POST",
        data,
    });
};

const deleteBookmark = (params: { id: string }) => {
    return BaseURL({
        url: `/bookmark/${params.id}`,
        method: "DELETE",
    });
};

const getBookmarkOfUser = () => {
    return BaseURL({
        url: `/bookmark`,
        method: "GET",
    });
}


export { bookmark, deleteBookmark, getBookmarkOfUser }