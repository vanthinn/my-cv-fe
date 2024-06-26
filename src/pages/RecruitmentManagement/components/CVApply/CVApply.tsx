import { FC, useCallback, useEffect, useState } from 'react'
import Button from '../../../../components/Button'
import { IconButton, Menu, MenuItem, Tooltip } from '@mui/material'
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined'
import DoneIcon from '@mui/icons-material/Done'
import ClearIcon from '@mui/icons-material/Clear'
import { GridRenderCellParams, GridSortModel } from '@mui/x-data-grid'
import { formatDateLocalV2 } from '../../../../utils/functions/formatDay'
import Table from '../../../../components/Table'
import { IResumeApply } from '../../../../types/IResume'
import TextFieldV2 from '../../../../components/TextFieldV2'
import { useStoreActions, useStoreState } from 'easy-peasy'
import {
  jobActionSelector,
  jobStateSelector,
  notifyActionSelector,
} from '../../../../store'
import { useParams } from 'react-router-dom'
import { useDebounce } from '../../../../hooks/useDebounce'
import ModalShowImageCV from '../ModalShowImageCV'
import Loading from '../../../../layouts/components/Loading'

interface Props {}

interface IActionMenu {
  params: any
  getAllJobApplyHome: any
  setLoadingPage: any
}

function ActionsMenu({ params, getAllJobApplyHome, setLoadingPage }: IActionMenu) {
  const [anchorEl, setAnchorEl] = useState(null)
  const { updateStatusJobApply, setIsUpdateStatusJobApplySuccess } =
    useStoreActions(jobActionSelector)
  const { isUpdateStatusJobApplySuccess, messageErrorJob } =
    useStoreState(jobStateSelector)
  const { setNotifySetting } = useStoreActions(notifyActionSelector)

  useEffect(() => {
    if (!isUpdateStatusJobApplySuccess) {
      setNotifySetting({
        show: true,
        status: 'error',
        message: messageErrorJob,
      })
      setIsUpdateStatusJobApplySuccess(true)
    }
  }, [isUpdateStatusJobApplySuccess])

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleApproveClick = async () => {
    setLoadingPage(true)
    const res = await updateStatusJobApply({ id: params.id, status: 'APPROVED' })
    if (res) {
      setNotifySetting({
        show: true,
        status: 'success',
        message: 'Approved cv successful',
      })
      getAllJobApplyHome()
    }
    setLoadingPage(false)
  }

  const handleRejectClick = async () => {
    setLoadingPage(true)
    const res = await updateStatusJobApply({ id: params.id, status: 'REJECT' })
    if (res) {
      setNotifySetting({
        show: true,
        status: 'success',
        message: 'Reject cv successful',
      })
      getAllJobApplyHome()
    }
    setLoadingPage(false)
  }

  return (
    <>
      <>
        <div className={`lg:flex gap-2 xs:hidden`}>
          <Button
            onClick={handleApproveClick}
            typeButton="approve">
            Approve
          </Button>
          <Button
            className="px-4 rounded-md"
            onClick={handleRejectClick}
            typeButton="reject">
            Reject
          </Button>
        </div>
      </>
      <div className="xs:block lg:hidden">
        <IconButton
          aria-label="Actions"
          aria-controls="actions-menu"
          aria-haspopup="true"
          onClick={handleClick}>
          <MoreVertOutlinedIcon />
        </IconButton>
        <Menu
          id="actions-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}>
          <MenuItem onClick={handleApproveClick}>
            <DoneIcon className="text-green-600" />
            <span className="ml-2 text-green-600"> Approve</span>
          </MenuItem>
          <MenuItem onClick={handleRejectClick}>
            <ClearIcon className="text-red-600" />
            <span className="ml-2 text-red-600"> Reject</span>
          </MenuItem>
        </Menu>
      </div>
    </>
  )
}

const CVApply: FC<Props> = (): JSX.Element => {
  const { id } = useParams()
  const { getJobApplyByJobId } = useStoreActions(jobActionSelector)

  const [inputSearch, setInputSearch] = useState<string>('')
  const [rowsData, setRows] = useState<IResumeApply[]>([])
  const [rowTotal, setRowTotal] = useState(0)
  const [imageCV, setImageCV] = useState('')
  const [openModalCV, setOpenModalCV] = useState(false)
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  })

  const [sortModel, setSortModel] = useState<GridSortModel>([
    {
      field: 'candidateName',
      sort: 'asc',
    },
  ])
  const [loading, setLoading] = useState<boolean>(false)
  const [loadingPage, setLoadingPage] = useState<boolean>(false)

  const getAllJobApplyByJobId = async () => {
    setLoading(true)
    const res = await getJobApplyByJobId({
      id: id || '',
      params: {
        skip: paginationModel.page * paginationModel.pageSize,
        take: paginationModel.pageSize,
        search: inputSearch,
        status: 'PENDING',
        order: `${sortModel[0]?.field}:${sortModel[0]?.sort}`,
      },
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

  const debounced = useDebounce(inputSearch, 500)

  useEffect(() => {
    getAllJobApplyByJobId()
  }, [paginationModel, sortModel, debounced])

  const handleChangeSearch = (value: any): void => {
    setInputSearch(value.target.value)
  }

  const handleSortModelChange = useCallback((newSortModel: GridSortModel) => {
    setSortModel(newSortModel)
  }, [])

  const columnsCVApply = [
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
      field: 'candidateName',
      headerName: 'Candidate Name',
      flex: 1.5,
      minWidth: 150,
      editable: false,
      align: 'left',
      headerAlign: 'left',
      hideable: false,
      renderCell: (params: GridRenderCellParams<any, string>) => (
        <Tooltip title={params.row.candidateName}>
          <p className={`text-black line-clamp-1`}>{params.row.candidateName}</p>
        </Tooltip>
      ),
    },
    {
      field: 'jobTitle',
      headerName: 'Job Title',
      flex: 1.5,
      minWidth: 150,
      editable: false,
      align: 'left',
      headerAlign: 'left',
      hideable: false,
      renderCell: (params: GridRenderCellParams<any, string>) => (
        <Tooltip title={params.row.job.jobTitle}>
          <p className={`text-black line-clamp-1`}>{params.row.job.jobTitle}</p>
        </Tooltip>
      ),
    },
    {
      field: 'createdAt',
      headerName: 'Create At',
      type: 'string',
      minWidth: 100,
      flex: 1,
      align: 'left',
      headerAlign: 'left',
      disableColumnMenu: true,
      hideable: false,
      renderCell: (params: GridRenderCellParams<any, string>) => (
        <Tooltip title={formatDateLocalV2(params.row.createdAt)}>
          <p className={`text-black line-clamp-1`}>
            {formatDateLocalV2(params.row.createdAt)}
          </p>
        </Tooltip>
      ),
    },
    {
      field: 'detailCV',
      headerName: 'Detail CV',
      type: 'string',
      minWidth: 100,
      flex: 1,
      align: 'left',
      headerAlign: 'left',
      disableColumnMenu: true,
      hideable: false,
      sortable: false,
      renderCell: (params: GridRenderCellParams<any, string>) => (
        <li
          onClick={() => {
            setImageCV(params.row.CV.image)
            setOpenModalCV(true)
          }}
          className="list-none text-blue-500 cursor-pointer hover:underline hover:text-violet-700  ">
          detail cv
        </li>
      ),
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1.5,
      minWidth: 80,
      align: 'center',
      headerAlign: 'center',
      disableColumnMenu: true,
      sortable: false,
      disableSelectionOnClick: false,
      renderCell: (params: GridRenderCellParams<any, any>) => (
        <ActionsMenu
          params={params}
          getAllJobApplyHome={getAllJobApplyByJobId}
          setLoadingPage={setLoadingPage}
        />
      ),
    },
  ]
  return (
    <>
      <div>
        <div className="mt-4">
          <TextFieldV2
            type="search"
            onChange={handleChangeSearch}
            value={inputSearch}
            placeholder="Search by candidate name"
            width="350px"
          />
        </div>
        <div className="mt-3 w-full overflow-x-hidden">
          <Table
            columns={columnsCVApply}
            rows={rowsData}
            sortModel={sortModel}
            onSortModelChange={handleSortModelChange}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            loading={loading}
            totalRow={rowTotal}
          />
        </div>
      </div>

      {openModalCV && (
        <ModalShowImageCV
          open={openModalCV}
          setOpen={setOpenModalCV}
          image={imageCV}
        />
      )}

      {loadingPage && <Loading />}
    </>
  )
}

export default CVApply
