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
interface Props {}

const fakeData = [
  {
    id: '1223456',
    title: 'Front-end',
    salary: '10tr - 12tr',
    jobType: 'Full time',
    experience: 'More than 1 year',
    createdAt: '2024-5-5',
    deadline: '2024-6-6',
  },
  {
    id: '12234567',
    title: 'Front-end',
    salary: '10tr - 12tr',
    jobType: 'Full time',
    experience: 'More than 1 year',
    createdAt: '2024-5-5',
    deadline: '2024-6-6',
  },
]

const RecruitmentManagement: FC<Props> = (props): JSX.Element => {
  const navigate = useNavigate()
  const [inputSearch, setInputSearch] = useState<string>('')
  const [rowsData, setRows] = useState<IRecruitmentResponse[]>([])
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
  const [isOpenModalAddEdit, setIsOpenModalAddEdit] = useState<boolean>(false)

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
      field: 'title',
      headerName: 'Title',
      flex: 1.6,
      minWidth: 150,
      editable: false,
      align: 'left',
      headerAlign: 'left',
      hideable: false,
      renderCell: (params: GridRenderCellParams<any, string>) => (
        <Tooltip title={params.row.title}>
          <p className={`text-black line-clamp-1`}>{params.row.title}</p>
        </Tooltip>
      ),
    },
    {
      field: 'salary',
      headerName: 'Salary',
      type: 'string',
      flex: 1.5,
      minWidth: 150,
      align: 'left',
      headerAlign: 'left',
      hideable: false,
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
      sortable: false,
      renderCell: (params: GridRenderCellParams<any, number>) => (
        <Tooltip title={params.row.createdAt}>
          <p className={`text-black line-clamp-1`}>{params.row.createdAt}</p>
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
        <Tooltip title={params.row.deadline}>
          <p className={`text-black line-clamp-1`}>{params.row.deadline}</p>
        </Tooltip>
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
            onClick={() => {}}
          />
          <DeleteIcon
            sx={{ color: '#d32f2f', cursor: 'pointer' }}
            onClick={() => {}}
          />
        </div>
      </>
    )
  }
  return (
    <>
      <div className="p-4 bg-white rounded-md flex-1 flex flex-col shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]">
        <h4 className="font-semibold text-xl">Recruitment management</h4>

        <div className="mt-4 flex justify-between">
          <TextFieldV2
            type="search"
            onChange={handleChangeSearch}
            value={inputSearch}
            placeholder="Search by candidate name"
            width="350px"
          />
          <Button
            onClick={() => setIsOpenModalAddEdit(true)}
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
      </div>

      {isOpenModalAddEdit && (
        <ModalAddEditJob
          open={isOpenModalAddEdit}
          setOpen={setIsOpenModalAddEdit}
        />
      )}
    </>
  )
}

export default RecruitmentManagement
