import { FC, useCallback, useEffect, useState } from 'react'
import TextFieldV2 from '../../../../components/TextFieldV2'
import Table from '../../../../components/Table'
import { GridRenderCellParams, GridSortModel } from '@mui/x-data-grid'

import { Tooltip } from '@mui/material'
import { IResumeApply } from '../../../../types/IResume'
import { formatDateLocalV2 } from '../../../../utils/functions/formatDay'
import { useStoreActions } from 'easy-peasy'
import { jobActionSelector } from '../../../../store'
import ModalShowImageCV from '../ModalShowImageCV'
import { useParams } from 'react-router-dom'

interface Props {}

const TabCVApprove: FC<Props> = (props): JSX.Element => {
  const { id } = useParams()
  const { getJobApplyByJobId } = useStoreActions(jobActionSelector)
  const [inputSearch, setInputSearch] = useState<string>('')
  const [rowsData, setRows] = useState<IResumeApply[]>([])
  const [rowTotal, setRowTotal] = useState(0)
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
  const [imageCV, setImageCV] = useState('')
  const [openModalCV, setOpenModalCV] = useState(false)

  const getAllJobApplyByJobId = async () => {
    setLoading(true)
    const res = await getJobApplyByJobId({
      id: id || '',
      params: {
        skip: paginationModel.page * paginationModel.pageSize,
        take: paginationModel.pageSize,
        search: inputSearch,
        order: `${sortModel[0]?.field}:${sortModel[0]?.sort}`,
        status: 'APPROVED',
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

  useEffect(() => {
    getAllJobApplyByJobId()
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
      field: 'candidateName',
      headerName: 'Candidate Name',
      flex: 1.5,
      minWidth: 150,
      editable: false,
      align: 'left',
      headerAlign: 'left',
      hideable: false,
      renderCell: (params: GridRenderCellParams<any, string>) => (
        <Tooltip title={params.row.fullName}>
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
        <Tooltip title={params.row.job.title}>
          <p className={`text-black line-clamp-1`}>{params.row.job.jobTitle}</p>
        </Tooltip>
      ),
    },
    {
      field: 'email',
      headerName: 'Email',
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
    </>
  )
}

export default TabCVApprove
