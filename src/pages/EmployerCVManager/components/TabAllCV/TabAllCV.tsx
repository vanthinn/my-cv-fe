import { FC, useCallback, useEffect, useState } from 'react'
import TextFieldV2 from '../../../../components/TextFieldV2'
import Table from '../../../../components/Table'
import { GridRenderCellParams, GridSortModel } from '@mui/x-data-grid'
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined'
import DoneIcon from '@mui/icons-material/Done'
import ClearIcon from '@mui/icons-material/Clear'
import Button from '../../../../components/Button'
import { IconButton, Menu, MenuItem, Tooltip } from '@mui/material'
import { IResumeApply } from '../../../../types/IResume'
import { formatDateLocalV2 } from '../../../../utils/functions/formatDay'

interface Props {}

interface IActionMenu {
  params: any
}

const fakeData = [
  {
    id: '12644',
    fullName: 'Nguyen Van Thinh',
    email: 'vanthinh@gmail.com',
    job: {
      title: 'Front-end',
    },
    cv: {
      id: 122123,
    },
    createdAt: '2022-04-24',
  },
]

function ActionsMenu({ params }: IActionMenu) {
  const [anchorEl, setAnchorEl] = useState(null)
  const [loading, setLoading] = useState<boolean>(false)

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleApproveClick = async () => {}

  const handleRejectClick = async () => {}

  return (
    <>
      <>
        <div className={`lg:flex gap-2 xs:hidden`}>
          <Button
            loading={loading}
            onClick={handleApproveClick}
            typeButton="approve">
            Approve
          </Button>
          <Button
            loading={loading}
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
          <MenuItem
            disabled={loading}
            onClick={handleApproveClick}>
            <DoneIcon className="text-green-600" />
            <span className="ml-2 text-green-600"> Approve</span>
          </MenuItem>
          <MenuItem
            disabled={loading}
            onClick={handleRejectClick}>
            <ClearIcon className="text-red-600" />
            <span className="ml-2 text-red-600"> Reject</span>
          </MenuItem>
        </Menu>
      </div>
    </>
  )
}

const TabAllCV: FC<Props> = (props): JSX.Element => {
  const [inputSearch, setInputSearch] = useState<string>('')
  const [rowsData, setRows] = useState<IResumeApply[]>([])
  const [rowTotal, setRowTotal] = useState(0)
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  })

  const [sortModel, setSortModel] = useState<GridSortModel>([
    {
      field: 'name',
      sort: 'asc',
    },
  ])
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    setRowTotal(fakeData?.length)
    const data = fakeData?.map((item: any, index: number) => ({
      ...item,
      tag: paginationModel.page * paginationModel.pageSize + index + 1,
    }))
    setRows(data)
  }, [sortModel, paginationModel])

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
      field: 'fullName',
      headerName: 'Candidate Name',
      flex: 1.5,
      minWidth: 150,
      editable: false,
      align: 'left',
      headerAlign: 'left',
      hideable: false,
      renderCell: (params: GridRenderCellParams<any, string>) => (
        <Tooltip title={params.row.fullName}>
          <p className={`text-black line-clamp-1`}>{params.row.fullName}</p>
        </Tooltip>
      ),
    },
    {
      field: 'title',
      headerName: 'Job Title',
      flex: 1.5,
      minWidth: 150,
      editable: false,
      align: 'left',
      headerAlign: 'left',
      hideable: false,
      renderCell: (params: GridRenderCellParams<any, string>) => (
        <Tooltip title={params.row.job.title}>
          <p className={`text-black line-clamp-1`}>{params.row.job.title}</p>
        </Tooltip>
      ),
    },
    {
      field: 'email',
      headerName: 'Candidate Mail',
      flex: 1.5,
      minWidth: 150,
      editable: false,
      align: 'left',
      headerAlign: 'left',
      hideable: false,
      renderCell: (params: GridRenderCellParams<any, string>) => (
        <Tooltip title={params.row.email}>
          <p className={`text-black line-clamp-1`}>{params.row.email}</p>
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
      renderCell: (params: GridRenderCellParams<any, string>) => (
        <li className="list-none text-blue-500 cursor-pointer hover:underline hover:text-violet-700  ">
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
        <ActionsMenu params={params} />
      ),
    },
  ]
  return (
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
  )
}

export default TabAllCV
