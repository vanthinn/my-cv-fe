import { persist, action, Action, Thunk, thunk } from 'easy-peasy'
import { ICompany } from '../../types/ICompany'
import {
  chooseCompany,
  createCompany,
  getAllCompany,
  getCompanyById,
  updateCompany,
} from '../../services/company.service'

export interface ICompanyModel {
  //MessageError
  messageErrorCompany: string
  setMessageErrorCompany: Action<ICompanyModel, string>

  //setCompany
  company: ICompany | null
  setCompany: Action<ICompanyModel, ICompany | null>

  //getAllCompany
  isGetAllCompanySuccess: boolean
  setIsGetAllCompanySuccess: Action<ICompanyModel, boolean>
  getAllCompany: Thunk<ICompanyModel, any>

  //GetAllCompanyById
  isGetCompanyByIdSuccess: boolean
  setIsGetCompanyByIdSuccess: Action<ICompanyModel, boolean>
  getCompanyById: Thunk<ICompanyModel, string>

  //updateCompany
  isUpdateCompanySuccess: boolean
  setIsUpdateCompanySuccess: Action<ICompanyModel, boolean>
  updateCompany: Thunk<ICompanyModel, ICompany>

  //chooseCompany
  chooseCompany: Thunk<ICompanyModel, { id: string }>

  //CreateCompany
  isCreateCompanySuccess: boolean
  setIsCreateCompanySuccess: Action<ICompanyModel, boolean>
  createCompany: Thunk<ICompanyModel, Omit<ICompany, 'id'>>
}

export const companyModel: ICompanyModel = persist({
  messageErrorCompany: '',
  setMessageErrorCompany: action((state, payload) => {
    state.messageErrorCompany = payload
  }),

  //setCompany
  company: null,
  setCompany: action((state, payload) => {
    state.company = payload
  }),

  //getAllCompany
  isGetAllCompanySuccess: true,
  setIsGetAllCompanySuccess: action((state, payload) => {
    state.isGetAllCompanySuccess = payload
  }),
  getAllCompany: thunk(async (actions, payload) => {
    return getAllCompany(payload)
      .then(async (res) => {
        actions.setIsGetAllCompanySuccess(true)
        return res.data
      })
      .catch((error) => {
        actions.setIsGetAllCompanySuccess(false)
        actions.setMessageErrorCompany(error?.response?.data?.message)
      })
  }),

  //GetCompanyById
  isGetCompanyByIdSuccess: true,
  setIsGetCompanyByIdSuccess: action((state, payload) => {
    state.isGetCompanyByIdSuccess = payload
  }),
  getCompanyById: thunk(async (actions, payload) => {
    return getCompanyById(payload)
      .then(async (res) => {
        actions.setIsGetCompanyByIdSuccess(true)
        return res.data
      })
      .catch((error) => {
        actions.setIsGetCompanyByIdSuccess(false)
        actions.setMessageErrorCompany(error?.response?.data?.message)
      })
  }),

  isUpdateCompanySuccess: true,
  setIsUpdateCompanySuccess: action((state, payload) => {
    state.isUpdateCompanySuccess = payload
  }),
  updateCompany: thunk(async (actions, payload) => {
    return updateCompany(payload)
      .then(async (res) => {
        actions.setIsUpdateCompanySuccess(true)
        return res.data
      })
      .catch((error) => {
        actions.setIsUpdateCompanySuccess(false)
        actions.setMessageErrorCompany(error?.response?.data?.message)
      })
  }),

  chooseCompany: thunk(async (actions, payload) => {
    return chooseCompany(payload)
      .then(async (res) => {
        return res
      })
      .catch((error) => {
        actions.setMessageErrorCompany(error?.response?.data?.message)
      })
  }),

  isCreateCompanySuccess: true,
  setIsCreateCompanySuccess: action((state, payload) => {
    state.isCreateCompanySuccess = payload
  }),
  createCompany: thunk(async (actions, payload) => {
    return createCompany(payload)
      .then(async (res) => {
        actions.setIsCreateCompanySuccess(true)
        return res.data
      })
      .catch((error) => {
        actions.setIsCreateCompanySuccess(false)
        actions.setMessageErrorCompany(error?.response?.data?.message)
      })
  }),
})
