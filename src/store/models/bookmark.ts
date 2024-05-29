import { Action, Thunk, action, persist, thunk } from "easy-peasy";
import { bookmark, deleteBookmark, getBookmarkOfUser } from "../../services/bookmark.service";

export interface IBookmarkModel {
    //MessageError
    messageErrorBookmark: string;
    setMessageErrorBookmark: Action<IBookmarkModel, string>;

    //GetAllBookmark
    isGetAllBookmarkSuccess: boolean;
    setIsGetAllBookmarkSuccess: Action<IBookmarkModel, boolean>;
    getBookmarkOfUser: Thunk<IBookmarkModel, undefined>;

    //CreateBookmark
    isCreateBookmarkSuccess: boolean;
    setIsCreateBookmarkSuccess: Action<IBookmarkModel, boolean>;
    createBookmark: Thunk<IBookmarkModel, { id: string }>;

    //deleteBookmark
    isDeleteBookmarkSuccess: boolean;
    setIsDeleteBookmarkSuccess: Action<IBookmarkModel, boolean>;
    deleteBookmark: Thunk<IBookmarkModel, { id: string }>;

}

export const bookmarkModel: IBookmarkModel = persist({
    messageErrorBookmark: "",
    setMessageErrorBookmark: action((state, payload) => {
        state.messageErrorBookmark = payload;
    }),

    isGetAllBookmarkSuccess: true,
    setIsGetAllBookmarkSuccess: action((state, payload) => {
        state.isGetAllBookmarkSuccess = payload;
    }),
    getBookmarkOfUser: thunk(async (actions) => {
        return getBookmarkOfUser()
            .then(async (res) => {
                actions.setIsGetAllBookmarkSuccess(true)
                return res.data;
            })
            .catch((error) => {
                console.log(error)
                actions.setIsGetAllBookmarkSuccess(false)
                actions.setMessageErrorBookmark(error?.response?.data?.message)
            });
    }),

    isCreateBookmarkSuccess: true,
    setIsCreateBookmarkSuccess: action((state, payload) => {
        state.isCreateBookmarkSuccess = payload;
    }),
    createBookmark: thunk(async (actions, payload) => {
        return bookmark(payload)
            .then(async (res) => {
                actions.setIsCreateBookmarkSuccess(true)
                return res;
            })
            .catch((error) => {
                actions.setIsCreateBookmarkSuccess(false)
                actions.setMessageErrorBookmark(error?.response?.data?.message)
            });
    }),

    isDeleteBookmarkSuccess: true,
    setIsDeleteBookmarkSuccess: action((state, payload) => {
        state.isDeleteBookmarkSuccess = payload;
    }),
    deleteBookmark: thunk(async (actions, payload) => {
        return deleteBookmark(payload)
            .then(async (res) => {
                actions.setIsCreateBookmarkSuccess(true)
                return res;
            })
            .catch((error) => {
                actions.setIsCreateBookmarkSuccess(false)
                actions.setMessageErrorBookmark(error?.response?.data?.message)
            });
    }),
})