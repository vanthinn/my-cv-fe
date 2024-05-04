import { FC, useState } from 'react'
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

interface Props {}

const fakeData = [
  {
    id: '1',
    displayName: 'CÔNG TY TNHH MEDIASTEP SOFTWARE VIỆT NAM',
    logo: logo,
    description:
      'Chúng tôi là Mediastep Software Việt Nam, một công ty phần mềm cung cấp cho bạn giải pháp thương mại điện tử mà bạn cần để bán nhiều hơn, có nhiều khách hàng hơn và xuất khẩu nhiều hơn.',
    address: 'Thành phố Hồ Chí Minh, Vietnam',
    scale: '201-500 nhân viên',
    fieldOfActivity: 'Marketing and Advertising',
    count_jobs: 1,
  },
  {
    id: '1',
    displayName: 'CÔNG TY TNHH MEDIASTEP SOFTWARE VIỆT NAM',
    logo: logo,
    description:
      'Chúng tôi là Mediastep Software Việt Nam, một công ty phần mềm cung cấp cho bạn giải pháp thương mại điện tử mà bạn cần để bán nhiều hơn, có nhiều khách hàng hơn và xuất khẩu nhiều hơn.',
    address: 'Thành phố Hồ Chí Minh, Vietnam',
    scale: '201-500 nhân viên',
    fieldOfActivity: 'Marketing and Advertising',
    count_jobs: 1,
  },
  {
    id: '1',
    displayName: 'CÔNG TY TNHH MEDIASTEP SOFTWARE VIỆT NAM',
    logo: logo,
    description:
      'Chúng tôi là Mediastep Software Việt Nam, một công ty phần mềm cung cấp cho bạn giải pháp thương mại điện tử mà bạn cần để bán nhiều hơn, có nhiều khách hàng hơn và xuất khẩu nhiều hơn.',
    address: 'Thành phố Hồ Chí Minh, Vietnam',
    scale: '201-500 nhân viên',
    fieldOfActivity: 'Marketing and Advertising',
    count_jobs: 1,
  },
]

const Company: FC<Props> = (props): JSX.Element => {
  const [inputSearch, setInputSearch] = useState<string>('')
  const [city, setCity] = useState<string>('')

  const handleChangeSearch = (value: any): void => {
    setInputSearch(value.target.value)
  }

  const handleChangeCity = (value: any): void => {
    setCity(value)
  }
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

        <Button className="px-8">Search</Button>
      </div>

      <div className="mt-8 grid grid-cols-3 gap-8">
        {fakeData.map((item, index) => (
          <div
            key={index}
            className="col-span-1 px-5 py-3.5 border border-gray-300 rounded-md hover:shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] transition-all duration-200 cursor-pointer
              shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
            <div className="flex gap-4 items-center">
              <div className="flex-shrink-0 h-16 w-16 border border-gray-200 rounded-lg">
                <img
                  className="h-full w-full object-cover"
                  src={item.logo}
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
                {item.count_jobs} active job{' '}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Company
