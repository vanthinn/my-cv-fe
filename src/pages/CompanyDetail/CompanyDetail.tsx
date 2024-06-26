import { FC, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { companyActionSelector, jobActionSelector, userStateSelector } from '../../store'
import { useStoreActions, useStoreState } from 'easy-peasy'
import { ICompany } from '../../types/ICompany'
import { IRecruitmentResponse } from '../../types/IRecruitment'
import { pageMode } from '../../types/ICommon'
import TextFieldV2 from '../../components/TextFieldV2'
import Button from '../../components/Button'
import { Pagination, Tooltip } from '@mui/material'
import { formatDayVN } from '../../utils/functions/formatDay'
import { HiOutlineBookmark } from 'react-icons/hi'

interface Props {}

const CompanyDetail: FC<Props> = (props): JSX.Element => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getCompanyById } = useStoreActions(companyActionSelector)
  const { getAllJob } = useStoreActions(jobActionSelector)
  const { currentUserSuccess } = useStoreState(userStateSelector)
  const [company, setCompany] = useState<ICompany>()
  const [listJob, setListJob] = useState<IRecruitmentResponse[]>([])
  const [inputSearch, setInputSearch] = useState<string>('')
  const [totalRowCount, setTotalRowCount] = useState<number>(0)
  const [paginationModel, setPaginationModel] = useState<pageMode>({
    page: 1,
    pageSize: 10,
  })
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (id) {
      const callAPI = async () => {
        try {
          await Promise.all([getCompanyByIdPage()])
        } catch (error) {
          console.error('Error calling APIs:', error)
        }
      }
      callAPI()
    } else {
      navigate('*')
    }
  }, [id])

  useEffect(() => {
    getAllJobHome()
  }, [paginationModel])

  const getAllJobHome = async () => {
    setIsLoading(true)
    const res = await getAllJob({
      skip: (paginationModel.page - 1) * paginationModel.pageSize,
      take: paginationModel.pageSize,
      search: inputSearch,
      companyId: id,
      userId: currentUserSuccess ? currentUserSuccess.id : undefined,
      status: 'ACTIVE',
    })
    if (res) {
      setTotalRowCount(res?.totalRecords)
      setListJob(res.data)
    }
    setIsLoading(false)
  }

  const getCompanyByIdPage = async () => {
    if (id) {
      const res = await getCompanyById(id)
      if (res) {
        setCompany(res)
      }
    }
  }

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    if (value !== paginationModel.page) {
      setPaginationModel((prev) => ({
        ...prev,
        page: value,
      }))
    }
  }

  const handleChangeSearch = (value: any): void => {
    setInputSearch(value.target.value)
  }

  const handleSearch = () => {
    getAllJobHome()
  }

  return (
    <div className="my-8 flex flex-col items-center">
      <div className="flex flex-1 w-full gap-8 px-5 py-4 min-h-8 rounded-lg bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
        <div className="h-36 w-36 ">
          <img
            className="object-cover h-full w-full border border-slate-200 rounded-lg"
            src={company?.logoUrl}
            alt={company?.displayName}
          />
        </div>

        <div className="flex flex-col ">
          <h2 className="text-2xl font-semibold">{company?.displayName}</h2>

          <div className="mt-2 grid grid-cols-2 gap-2">
            <div className="flex gap-4 items-start">
              <span className="text-gray-500  whitespace-nowrap">Field of Activity:</span>
              <span className="font-medium break-words">{company?.fieldOfActivity}</span>
            </div>

            <div className="flex gap-4 ml-32">
              <span className="text-gray-500">Scale:</span>
              <span className="font-medium">{company?.scale}</span>
            </div>

            <div className="flex gap-4">
              <span className="text-gray-500">Address:</span>
              <span className="font-medium">{company?.address}</span>
            </div>

            <div className="flex gap-4 ml-32">
              <span className="text-gray-500">Website:</span>
              <a
                href={company?.website}
                className="font-medium text-blue-500 break-words">
                {company?.website}
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-col flex-1 w-full  px-5 py-4 min-h-8 rounded-lg bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
        <h4 className="text-xl font-medium">Company introduction</h4>
        <div
          className="mt-2 "
          dangerouslySetInnerHTML={{
            __html: company?.description || '',
          }}
        />
      </div>

      <div className="mt-8 flex flex-col flex-1 w-full  px-5 py-4 min-h-8 rounded-lg bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
        <h4 className="text-xl font-medium">Recruitment</h4>

        <div className="mt-2 flex gap-8">
          <TextFieldV2
            type="search"
            onChange={handleChangeSearch}
            value={inputSearch}
            placeholder="Search for jobs"
            width="300px"
          />

          <Button
            onClick={() => handleSearch()}
            className="px-8">
            Search
          </Button>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-6">
          {listJob &&
            listJob.map((job, index) => (
              <div
                key={index}
                onClick={() => navigate('/jobs/' + job.id)}
                className="flex flex-col border border-slate-300 min-h-8 px-3 py-3 hover:cursor-pointer hover:shadow-2xl hover:shadow-blue-500/20 rounded-md shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
                <div className="flex justify-between items-center">
                  <Tooltip title={job.jobTitle}>
                    <h4 className="line-clamp-1 text-xl font-medium text-gray-700 ">
                      {job.jobTitle}
                    </h4>
                  </Tooltip>
                  <span className="ml-4 text-[15px] text-blue-500 font-semibold">
                    {job.salary}
                  </span>
                </div>

                <div className="flex mt-2 gap-4 flex-wrap">
                  <li className="list-none px-2.5 py-1 bg-blue-400 text-white rounded-md text-sm">
                    {job.experience}
                  </li>
                  <li className="list-none px-2.5 py-1 bg-blue-400 text-white rounded-md text-sm">
                    {job.jobType}
                  </li>
                  {job.education && (
                    <li className="list-none px-2.5 py-1 bg-blue-400 text-white rounded-md text-sm">
                      {job.education}
                    </li>
                  )}
                </div>

                {/* <div
                  style={{ paddingBottom: '16px' }}
                  className="mt-4  flex gap-4 items-center border-b border-slate-300 ">
                  <img
                    className="h-14 w-14 border border-slate-200 rounded-md"
                    src={job.company.images}
                    alt=""
                  />
                  <div className="flex flex-col flex-1 ">
                    <Tooltip title={job.company.displayName}>
                      <h4 className="line-clamp-1 text-base font-medium text-gray-700 ">
                        {job.company.displayName}
                      </h4>
                    </Tooltip>
                    <div className="flex items-center text-sm mt-0.5 ">
                      <Tooltip title={job.company.address}>
                        <span className="line-clamp-1 ">{job.company.address}</span>
                      </Tooltip>
                    </div>
                  </div>
                </div> */}

                <div className="mt-auto  flex justify-between ">
                  <div className="flex gap-2 text-[15px] mt-3 ">
                    <span className="text-red-500">Deadline: </span>
                    <span className="text-red-500">{formatDayVN(job.deadline)}</span>
                  </div>
                  <Tooltip title="Bookmark">
                    <div className="hover:text-blue-600 cursor-pointer mt-3">
                      <HiOutlineBookmark className="text-xl hover:text-blue-500" />
                    </div>
                  </Tooltip>
                </div>
              </div>
            ))}
        </div>

        <div className="flex justify-center mt-8">
          <Pagination
            count={Math.ceil(totalRowCount / paginationModel.pageSize)}
            page={paginationModel.page}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  )
}

export default CompanyDetail
