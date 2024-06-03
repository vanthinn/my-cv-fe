import { FC, useEffect, useState } from 'react'
import TextFieldV2 from '../../components/TextFieldV2'
import AutocompleteCustom from '../../components/Autocomplete/Autocomplete'
import { LIST_COUNTRY, experienceEnum } from '../../common/constants'
import Button from '../../components/Button'
import Selected from '../../components/Select'
import { useStoreActions, useStoreState } from 'easy-peasy'
import { bookmarkActionSelector, jobActionSelector, userStateSelector } from '../../store'
import { pageMode } from '../../types/ICommon'
import { IRecruitmentResponse } from '../../types/IRecruitment'
import { Pagination, Tooltip } from '@mui/material'
import default_logo from '../../assets/images/logo.png'
import { formatDayVN } from '../../utils/functions/formatDay'
import { HiBookmark, HiOutlineBookmark } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'

interface Props {}

const HomePage: FC<Props> = (props): JSX.Element => {
  const navigate = useNavigate()
  const { createBookmark, deleteBookmark } = useStoreActions(bookmarkActionSelector)
  const { getAllJob } = useStoreActions(jobActionSelector)
  const { currentUserSuccess } = useStoreState(userStateSelector)
  const [city, setCity] = useState<string>('')
  const [experience, setExperience] = useState<string>('')
  const [inputSearch, setInputSearch] = useState<string>('')
  const [jobData, setJobData] = useState<IRecruitmentResponse[]>([])
  const [totalRowCount, setTotalRowCount] = useState<number>(0)
  const [paginationModel, setPaginationModel] = useState<pageMode>({
    page: 1,
    pageSize: 9,
  })
  const [loading, setLoading] = useState<string>('START')
  const [arrayStatusBookmark, setArrayStatusBookmark] = useState([
    {
      id: '',
      statusBookmark: '',
    },
  ])

  const handleChangeSearch = (value: any): void => {
    setInputSearch(value.target.value)
  }

  const handleChangeCity = (value: any): void => {
    setCity(value)
  }

  const handleChangeExperience = (value: any): void => {
    setExperience(value.target.value)
  }

  const handleSearch = () => {
    addQueryParam(inputSearch, city, experience)
    getAllJobHome()
  }

  const handleBookmark = async (id: string, index: number) => {
    if (arrayStatusBookmark[index].statusBookmark === 'NONE_BOOKMARK') {
      await createBookmark({ id: id })
      const newData = { ...arrayStatusBookmark[index], statusBookmark: 'BOOKMARK' }
      const updatedArray = [...arrayStatusBookmark]
      updatedArray[index] = newData
      setArrayStatusBookmark(updatedArray)
    } else {
      await deleteBookmark({ id: id })
      const newData = { ...arrayStatusBookmark[index], statusBookmark: 'NONE_BOOKMARK' }
      const updatedArray = [...arrayStatusBookmark]
      updatedArray[index] = newData
      setArrayStatusBookmark(updatedArray)
    }
  }

  const getAllJobHome = async () => {
    setLoading('LOADING')
    const res = await getAllJob({
      skip: (paginationModel.page - 1) * paginationModel.pageSize,
      take: paginationModel.pageSize,
      search: inputSearch,
      city: city,
      experience: experience,
      userId: currentUserSuccess ? currentUserSuccess.id : undefined,
    })
    if (res) {
      setTotalRowCount(res?.totalRecords)
      setJobData(res.data)
      const listStatusBookMark = res.data.map((record: any) => {
        return {
          id: record.id,
          statusBookmark: record.statusBookmark,
        }
      })
      setArrayStatusBookmark(listStatusBookMark)
    }
    setLoading('LOADING_SUCCESS')
  }

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    if (value !== paginationModel.page) {
      setPaginationModel((prev) => ({
        ...prev,
        page: value,
      }))
    }
  }

  const addQueryParam = (valueSearch: string, city: string, experience: string): void => {
    const queryParams = new URLSearchParams()
    queryParams.set('search', valueSearch.trim())
    queryParams.set('city', city.trim())
    queryParams.set('experience', experience.trim())
    const newURL = `/?${queryParams.toString()}`
    window.history.pushState({}, '', newURL)
  }

  useEffect(() => {
    addQueryParam(inputSearch, city, experience)
    getAllJobHome()
  }, [paginationModel])

  return (
    <div className="my-8 flex flex-col">
      <div className="flex w-full gap-6">
        <TextFieldV2
          type="search"
          onChange={handleChangeSearch}
          value={inputSearch}
          placeholder="Search for jobs"
          width="400px"
        />

        <AutocompleteCustom
          value={city}
          onChange={handleChangeCity}
          placeholder="All Cities"
          options={LIST_COUNTRY}
        />

        <Selected
          onChange={handleChangeExperience}
          value={experience}
          options={experienceEnum}
          empty="Select experience"
        />

        <Button
          onClick={() => handleSearch()}
          className="px-8">
          Search
        </Button>
      </div>
      <div className="mt-8 grid grid-cols-3 gap-4">
        {jobData.map((job, index) => (
          <div
            key={index}
            className="border border-slate-300 min-h-8 px-3 py-3 hover:cursor-pointer hover:shadow-2xl hover:shadow-blue-500/20 rounded-md shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
            <div
              onClick={() => navigate('/jobs/' + job.id)}
              className="flex justify-between items-center">
              <Tooltip title={job.jobTitle}>
                <h4 className="line-clamp-1 text-xl font-medium text-gray-700 ">
                  {job.jobTitle}
                </h4>
              </Tooltip>
              <span className="ml-4 text-[15px] text-blue-500 font-semibold">
                {job.salary}
              </span>
            </div>

            <div
              onClick={() => navigate('/jobs/' + job.id)}
              className="flex mt-2 gap-4 flex-wrap">
              <li className="list-none px-2.5 py-1 bg-blue-400 text-white rounded-md text-sm">
                {job.experience}
              </li>
              <li className="list-none px-2.5 py-1 bg-blue-400 text-white rounded-md text-sm">
                {job.jobType}
              </li>
              {/* {job.education && (
                <li className="list-none px-2.5 py-1 bg-blue-400 text-white rounded-md text-sm">
                  {job.education}
                </li>
              )} */}
            </div>

            <div
              onClick={() => navigate('/jobs/' + job.id)}
              style={{ paddingBottom: '16px' }}
              className="mt-4  flex gap-4 items-center border-b border-slate-300 ">
              <img
                className="h-14 w-14 border border-slate-200 rounded-md"
                src={job.company.images || default_logo}
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
            </div>

            <div className="mt-3  flex justify-between">
              <div className="flex gap-2 text-[15px] ">
                <span className="text-red-500">Deadline: </span>
                <span className="text-red-500">{formatDayVN(job.deadline)}</span>
              </div>
              <Tooltip title="Bookmark">
                <div
                  onClick={() => {
                    if (currentUserSuccess) handleBookmark(job.id || '', index)
                    else navigate('/auth/login')
                  }}>
                  {arrayStatusBookmark[index]?.statusBookmark == 'BOOKMARK' ? (
                    <HiBookmark className={`text-xl mr-1 text-blue-500 `} />
                  ) : (
                    <HiOutlineBookmark className={`text-xl mr-1`} />
                  )}
                </div>
              </Tooltip>
            </div>
          </div>
        ))}
      </div>

      {jobData && jobData.length > 0 && (
        <div className="flex justify-center mt-8">
          <Pagination
            count={Math.ceil(totalRowCount / paginationModel.pageSize)}
            page={paginationModel.page}
            onChange={handleChange}
          />
        </div>
      )}
    </div>
  )
}

export default HomePage
