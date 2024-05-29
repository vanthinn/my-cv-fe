import { FC, useEffect, useState } from 'react'
import TextFieldV2 from '../../components/TextFieldV2'
import AutocompleteCustom from '../../components/Autocomplete/Autocomplete'
import { LIST_COUNTRY } from '../../common/constants'
import Button from '../../components/Button'
import logo from '../../assets/images/logo.png'
import {
  HiOutlineBriefcase,
  HiOutlineOfficeBuilding,
  HiOutlineTrendingUp,
} from 'react-icons/hi'
import { pageMode } from '../../types/ICommon'
import { ICompany } from '../../types/ICompany'
import { useStoreActions } from 'easy-peasy'
import { companyActionSelector } from '../../store'
import { useNavigate } from 'react-router-dom'
import { Pagination } from '@mui/material'

interface Props {}

const Company: FC<Props> = (props): JSX.Element => {
  const navigate = useNavigate()
  const { getAllCompany } = useStoreActions(companyActionSelector)
  const [inputSearch, setInputSearch] = useState<string>('')
  const [city, setCity] = useState<string>('')
  const [companies, setCompanies] = useState<ICompany[]>([])
  const [totalRowCount, setTotalRowCount] = useState<number>(0)
  const [paginationModel, setPaginationModel] = useState<pageMode>({
    page: 1,
    pageSize: 9,
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleChangeSearch = (value: any): void => {
    setInputSearch(value.target.value)
  }

  const handleChangeCity = (value: any): void => {
    setCity(value)
  }

  const handleSearch = () => {
    addQueryParam(inputSearch, city)
    getAllCompanyHome()
  }

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    if (value !== paginationModel.page) {
      setPaginationModel((prev) => ({
        ...prev,
        page: value,
      }))
    }
  }

  const getAllCompanyHome = async () => {
    setIsLoading(true)
    const res = await getAllCompany({
      skip: (paginationModel.page - 1) * paginationModel.pageSize,
      take: paginationModel.pageSize,
      search: inputSearch,
      city: city,
    })
    if (res) {
      setTotalRowCount(res?.totalRecords)
      setCompanies(res.data)
    }
    setIsLoading(false)
  }

  const addQueryParam = (valueSearch: string, city: string): void => {
    const queryParams = new URLSearchParams()
    queryParams.set('search', valueSearch.trim())
    queryParams.set('city', city.trim())
    const newURL = `/company?${queryParams.toString()}`
    window.history.pushState({}, '', newURL)
  }

  useEffect(() => {
    addQueryParam(inputSearch, city)
    getAllCompanyHome()
  }, [paginationModel])

  return (
    <div className="my-8 flex flex-col">
      <div className="flex w-full gap-6">
        <TextFieldV2
          type="search"
          onChange={handleChangeSearch}
          value={inputSearch}
          placeholder="Search by name company"
          width="500px"
        />

        <AutocompleteCustom
          value={city}
          onChange={handleChangeCity}
          placeholder="All Cities"
          options={LIST_COUNTRY}
        />

        <Button
          onClick={() => handleSearch()}
          className="px-8">
          Search
        </Button>
      </div>

      <div className="mt-8 grid grid-cols-3 gap-8">
        {companies.map((item, index) => (
          <div
            key={index}
            onClick={() => navigate('/company/' + item.id)}
            className="col-span-1 px-5 py-3.5 border border-gray-300 rounded-md hover:shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] transition-all duration-200 cursor-pointer
              shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
            <div className="flex gap-4 items-center">
              <div className="flex-shrink-0 h-16 w-16 border border-gray-200 rounded-lg">
                <img
                  className="h-full w-full object-cover"
                  src={item.logoUrl}
                  alt=""
                />
              </div>
              <h4 className="text-sm font-medium">{item.displayName}</h4>
            </div>

            <div className="flex gap-2 mt-4 items-center">
              <HiOutlineOfficeBuilding />{' '}
              <span className="line-clamp-1 text-[14px]">{item.address}</span>
            </div>

            <div className="flex gap-2 mt-2 items-center">
              <HiOutlineTrendingUp />{' '}
              <span className="line-clamp-1 text-[14px]">{item.fieldOfActivity}</span>
            </div>

            <div className="flex gap-2 mt-2 items-center text-blue-600">
              <HiOutlineBriefcase />{' '}
              <span className="line-clamp-1 text-[14px]">
                {item._count?.jobs} active job{' '}
              </span>
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
  )
}

export default Company
