import { FC, useCallback, useEffect, useState } from 'react'
import TextFieldV2 from '../../components/TextFieldV2'
import Button from '../../components/Button'
import { HiPlusSm } from 'react-icons/hi'
import { GridRenderCellParams, GridSortModel } from '@mui/x-data-grid'
import { Tooltip } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import VisibilityIcon from '@mui/icons-material/Visibility'
import Table from '../../components/Table'
import { IRecruitmentResponse } from '../../types/IRecruitment'
import { useNavigate } from 'react-router-dom'
import ModalAddEditJob from './components/ModalAddEditJob'
import { useStoreActions, useStoreState } from 'easy-peasy'
import {
  companyStateSelector,
  jobActionSelector,
  jobStateSelector,
  notifyActionSelector,
  userStateSelector,
} from '../../store'
import test from '../../assets/images/Nhung-nguoi-cam-lap-cty.png'
import { useDebounce } from '../../hooks/useDebounce'
import { formatDayVN } from '../../utils/functions/formatDay'
import ModalConfirm from '../../components/ModalConfirm'
interface Props {}

const RecruitmentManagement: FC<Props> = (props): JSX.Element => {
  const navigate = useNavigate()
  const {
    messageErrorJob,
    isCreateJobSuccess,
    isUpdateJobSuccess,
    isDeleteJobOfferSuccess,
  } = useStoreState(jobStateSelector)
  const { currentUserSuccess } = useStoreState(userStateSelector)
  const {
    createJob,
    setIsCreateJobSuccess,
    getAllJob,
    updateJob,
    setIsUpdateJobSuccess,
    deleteJobOffer,
    setIsDeleteJobOfferSuccess,
  } = useStoreActions(jobActionSelector)
  const { setNotifySetting } = useStoreActions(notifyActionSelector)
  const { company } = useStoreState(companyStateSelector)
  const [inputSearch, setInputSearch] = useState<string>('')
  const [rowsData, setRows] = useState<IRecruitmentResponse[]>([])
  const [rowSelected, setRowSelected] = useState<IRecruitmentResponse>()
  const [rowTotal, setRowTotal] = useState(0)
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  })

  const [sortModel, setSortModel] = useState<GridSortModel>([
    {
      field: 'createdAt',
      sort: 'asc',
    },
  ])
  const [loading, setLoading] = useState<boolean>(false)
  const [isOpenModalAddEdit, setIsOpenModalAddEdit] = useState<boolean>(false)
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false)

  const getAllJobHome = async () => {
    setLoading(true)
    const res = await getAllJob({
      skip: paginationModel.page * paginationModel.pageSize,
      take: paginationModel.pageSize,
      search: inputSearch,
      order: `${sortModel[0]?.field}:${sortModel[0]?.sort}`,
      companyId: company?.id,
    })
    if (res) {
      const data = res.data?.map((item: any, index: number) => ({
        ...item,
        tag: paginationModel.page * paginationModel.pageSize + index + 1,
      }))
      setRowTotal(res?.totalRecords)
      setRows(data)
    }
    setLoading(false)
  }

  const handleChangeSearch = (value: any): void => {
    setInputSearch(value.target.value)
  }

  const handleAction = async (data: any) => {
    setLoading(true)
    if (rowSelected) {
      const res = await updateJob({ ...data })
      if (res) {
        setNotifySetting({
          show: true,
          status: 'success',
          message: 'Update job successfully',
        })
        getAllJobHome()
      }
    } else {
      const res = await createJob({ ...data })
      if (res) {
        setNotifySetting({
          show: true,
          status: 'success',
          message: 'Create job successfully',
        })
        getAllJobHome()
      }
    }
    setIsOpenModalAddEdit(false)
    setLoading(false)
  }

  const handleDelete = async () => {
    if (rowSelected) {
      setLoading(true)
      const res = await deleteJobOffer(rowSelected.id || '')
      if (res) {
        setNotifySetting({
          show: true,
          status: 'success',
          message: 'Delete job successful',
        })
        getAllJobHome()
      }
      setOpenModalDelete(false)
      setLoading(false)
    }
  }

  const handleSortModelChange = useCallback((newSortModel: GridSortModel) => {
    setSortModel(newSortModel)
  }, [])

  useEffect(() => {
    if (!isCreateJobSuccess) {
      setNotifySetting({
        show: true,
        status: 'error',
        message: messageErrorJob,
      })
      setIsCreateJobSuccess(true)
    }
  }, [isCreateJobSuccess])

  useEffect(() => {
    if (!isUpdateJobSuccess) {
      setNotifySetting({
        show: true,
        status: 'error',
        message: messageErrorJob,
      })
      setIsUpdateJobSuccess(true)
    }
  }, [isUpdateJobSuccess])

  useEffect(() => {
    if (!isDeleteJobOfferSuccess) {
      setNotifySetting({
        show: true,
        status: 'error',
        message: messageErrorJob,
      })
      setIsDeleteJobOfferSuccess(true)
    }
  }, [isDeleteJobOfferSuccess])

  const debounced = useDebounce(inputSearch, 500)

  useEffect(() => {
    getAllJobHome()
  }, [paginationModel, sortModel, debounced])

  const columnsRecruitment = [
    {
      field: 'tag',
      headerName: 'Tag',
      minWidth: 50,
      maxWidth: 50,
      type: 'number',
      align: 'left',
      headerAlign: 'left',
      hideable: false,
      sortable: false,
      disableColumnFilter: true,
      disableColumnMenu: true,
    },
    {
      field: 'jobTitle',
      headerName: 'Title',
      flex: 1.6,
      minWidth: 150,
      editable: false,
      align: 'left',
      headerAlign: 'left',
      hideable: false,
      renderCell: (params: GridRenderCellParams<any, string>) => (
        <Tooltip title={params.row.jobTitle}>
          <p className={`text-black line-clamp-1`}>{params.row.jobTitle}</p>
        </Tooltip>
      ),
    },
    {
      field: 'salary',
      headerName: 'Salary',
      type: 'string',
      flex: 1,
      minWidth: 150,
      align: 'left',
      headerAlign: 'left',
      hideable: false,
      sortable: false,
      renderCell: (params: GridRenderCellParams<any, string>) => (
        <Tooltip title={params.row.salary}>
          <p className={`text-black line-clamp-1`}>{params.row.salary}</p>
        </Tooltip>
      ),
    },
    {
      field: 'experience',
      headerName: 'Experience',
      type: 'number',
      minWidth: 100,
      flex: 1.2,
      align: 'left',
      headerAlign: 'left',
      hideable: false,
      sortable: false,
      renderCell: (params: GridRenderCellParams<any, number>) => (
        <Tooltip title={params.row.experience}>
          <p className={`text-black line-clamp-1`}>{params.row.experience}</p>
        </Tooltip>
      ),
    },
    {
      field: 'jobType',
      headerName: 'Job type',
      type: 'number',
      minWidth: 100,
      flex: 1.2,
      align: 'left',
      headerAlign: 'left',
      disableColumnMenu: true,
      hideable: false,
      sortable: false,
      renderCell: (params: GridRenderCellParams<any, number>) => (
        <Tooltip title={params.row.jobType}>
          <p className={`text-black line-clamp-1`}>{params.row.jobType}</p>
        </Tooltip>
      ),
    },
    {
      field: 'createdAt',
      headerName: 'Created at',
      type: 'number',
      minWidth: 100,
      flex: 1,
      align: 'left',
      headerAlign: 'left',
      disableColumnMenu: true,
      hideable: false,
      sortable: true,
      renderCell: (params: GridRenderCellParams<any, number>) => (
        <Tooltip title={formatDayVN(params.row.createdAt)}>
          <p className={`text-black line-clamp-1`}>{formatDayVN(params.row.createdAt)}</p>
        </Tooltip>
      ),
    },
    {
      field: 'deadline',
      headerName: 'Deadline',
      type: 'number',
      minWidth: 100,
      flex: 1,
      align: 'left',
      headerAlign: 'left',
      disableColumnMenu: true,
      hideable: false,
      sortable: false,
      renderCell: (params: GridRenderCellParams<any, number>) => (
        <Tooltip title={formatDayVN(params.row.deadline)}>
          <p className={`text-black line-clamp-1`}>{formatDayVN(params.row.deadline)}</p>
        </Tooltip>
      ),
    },
    {
      field: 'status',
      headerName: 'Status',
      type: 'number',
      minWidth: 100,
      flex: 1,
      align: 'left',
      headerAlign: 'left',
      disableColumnMenu: true,
      hideable: false,
      sortable: false,
      renderCell: (params: GridRenderCellParams<any, number>) => (
        <p
          className={`text-black line-clamp-1 text-[12px] px-4 py-1 rounded-3xl ${
            params.row.status === 'ACTIVE' ? 'bg-red-300' : 'bg-slate-100'
          } `}>
          {params.row.status}
        </p>
      ),
    },
    {
      field: 'action',
      headerName: 'Action',
      maxWidth: 120,
      minWidth: 80,
      flex: 1,
      align: 'left',
      headerAlign: 'left',
      disableColumnMenu: true,
      sortable: false,
      disableSelectionOnClick: false,
      renderCell: (params: GridRenderCellParams<any, any>) => {
        return <BtnAction params={params} />
      },
    },
  ]

  const BtnAction = (params: any) => {
    return (
      <>
        <div className={`flex gap-2`}>
          <VisibilityIcon
            sx={{ cursor: 'pointer', color: '#1278ccf0' }}
            onClick={() => {
              navigate('/employer/recruitment-management/' + params.params.row.id)
            }}
          />
          <EditIcon
            sx={{ cursor: 'pointer' }}
            onClick={() => {
              if (params.params.row.user.id !== currentUserSuccess?.id) {
                setNotifySetting({
                  show: true,
                  status: 'error',
                  message: 'Job can only be edited and deleted by the creator',
                })
              } else if (params.params.row.status === 'INACTIVE') {
                setNotifySetting({
                  show: true,
                  status: 'error',
                  message: 'Job cannot be edited',
                })
              } else {
                setRowSelected(params.params.row)
                setIsOpenModalAddEdit(true)
              }
            }}
          />
          <DeleteIcon
            sx={{ color: '#d32f2f', cursor: 'pointer' }}
            onClick={() => {
              if (params.params.row.user.id !== currentUserSuccess?.id) {
                setNotifySetting({
                  show: true,
                  status: 'error',
                  message: 'Job can only be edited and deleted by the creator',
                })
              } else {
                setRowSelected(params.params.row)
                setOpenModalDelete(true)
              }
            }}
          />
        </div>
      </>
    )
  }
  return (
    <>
      <div className="p-4 bg-white rounded-md flex-1 flex flex-col shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]">
        {company ? (
          <>
            <h4 className="font-semibold text-xl">Recruitment management</h4>

            <div className="mt-4 flex justify-between">
              <TextFieldV2
                type="search"
                onChange={handleChangeSearch}
                value={inputSearch}
                placeholder="Search by job title"
                width="350px"
              />
              <Button
                onClick={() => {
                  setRowSelected(undefined), setIsOpenModalAddEdit(true)
                }}
                className="flex items-center">
                <HiPlusSm className="mr-2 text-xl" />
                Add new job
              </Button>
            </div>

            <div className="mt-3 w-full overflow-x-hidden">
              <Table
                columns={columnsRecruitment}
                rows={rowsData}
                sortModel={sortModel}
                onSortModelChange={handleSortModelChange}
                paginationModel={paginationModel}
                onPaginationModelChange={setPaginationModel}
                loading={loading}
                totalRow={rowTotal}
              />
            </div>
          </>
        ) : (
          <div className="flex flex-col h-full w-full flex-1 justify-center items-center">
            <span className="text-xl font-semibold">
              Please fully update company information before posting the job
              <img
                className=" h-36 w-auto mx-auto mt-4"
                src={test}
                alt=""
              />
            </span>
            <Button
              onClick={() => navigate('/employer/account-setting/info-company')}
              className="mx-auto mt-6">
              Direction
            </Button>
          </div>
        )}
      </div>

      {isOpenModalAddEdit && (
        <ModalAddEditJob
          open={isOpenModalAddEdit}
          setOpen={setIsOpenModalAddEdit}
          data={rowSelected}
          handleAction={handleAction}
        />
      )}

      {openModalDelete && (
        <ModalConfirm
          open={openModalDelete}
          handleClose={() => {
            setOpenModalDelete(false)
          }}
          handleDelete={handleDelete}
        />
      )}
    </>
  )
}

export default RecruitmentManagement
