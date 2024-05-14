import { FC, useState } from 'react'
import { ICompany } from '../../../../types/ICompany'
import logo from '../../../../assets/images/logo.png'
import TextFieldV2 from '../../../../components/TextFieldV2'
import Button from '../../../../components/Button'
import {
  HiOutlineOfficeBuilding,
  HiOutlinePencilAlt,
  HiOutlinePlus,
  HiOutlineTrendingUp,
} from 'react-icons/hi'
import ModalAddEditCompany from '../../../../components/ModalAddEditCompany/ModalAddEditCompany'
import { useStoreActions, useStoreState } from 'easy-peasy'
import { companyActionSelector, companyStateSelector } from '../../../../store'

interface Props {}

const fakeData = [
  {
    id: '1',
    displayName: 'CÔNG TY TNHH MEDIASTEP SOFTWARE VIỆT NAM',
    logo: logo,
    description:
      '<p>Chúng tôi là Mediastep Software Việt Nam, một công ty phần mềm cung cấp cho bạn giải pháp thương mại điện tử mà bạn cần để bán nhiều hơn, có nhiều khách hàng hơn và xuất khẩu nhiều hơn. </p>',
    address: 'Thành phố Hồ Chí Minh, Vietnam',
    scale: '201-500 nhân viên',
    fieldOfActivity: 'Marketing and Advertising',
    count_jobs: 1,
    email: 'company@gmail.com',
    phoneNumber: '0923568587',
  },
  {
    id: '1',
    displayName: 'CÔNG TY TNHH MEDIASTEP SOFTWARE VIỆT NAM',
    logo: logo,
    description:
      '<p>Chúng tôi là Mediastep Software Việt Nam, một công ty phần mềm cung cấp cho bạn giải pháp thương mại điện tử mà bạn cần để bán nhiều hơn, có nhiều khách hàng hơn và xuất khẩu nhiều hơn. </p>',
    address: 'Thành phố Hồ Chí Minh, Vietnam',
    scale: '201-500 nhân viên',
    fieldOfActivity: 'Marketing and Advertising',
    count_jobs: 1,
    email: 'company@gmail.com',
    phoneNumber: '0923568587',
  },
  {
    id: '1',
    displayName: 'CÔNG TY TNHH MEDIASTEP',
    logo: logo,
    description:
      '<p>Chúng tôi là Mediastep Software Việt Nam, một công ty phần mềm cung cấp cho bạn giải pháp thương mại điện tử mà bạn cần để bán nhiều hơn, có nhiều khách hàng hơn và xuất khẩu nhiều hơn. </p>',
    address: 'Thành phố Hồ Chí Minh, Vietnam',
    scale: '201-500 nhân viên',
    fieldOfActivity: 'Marketing and Advertising',
    count_jobs: 1,
    email: 'company@gmail.com',
    phoneNumber: '0923568587',
  },
]

const InfoCompany: FC<Props> = (props): JSX.Element => {
  const { setCompany } = useStoreActions(companyActionSelector)
  const { company } = useStoreState(companyStateSelector)

  const [inputSearch, setInputSearch] = useState<string>('')
  const [isOpenModalAddEditCompany, setIsOpenModalAddEditCompany] = useState(false)

  const handleChangeSearch = (value: any): void => {
    setInputSearch(value.target.value)
  }
  return (
    <>
      <div className="flex flex-col border border-slate-200 flex-1 h-full px-4 py-4 rounded-md">
        <h4 className="font-semibold text-xl">Information company</h4>
        {!company && (
          <div className="mt-4">
            <div className="flex justify-between">
              <TextFieldV2
                type="search"
                onChange={handleChangeSearch}
                value={inputSearch}
                placeholder="Search company by name "
                width="380px"
                className="!pr-8 !py-1.5"
              />

              <Button
                className="flex items-center"
                onClick={() => setIsOpenModalAddEditCompany(true)}>
                <HiOutlinePlus className="mr-2" /> Create new company
              </Button>
            </div>
            <p className="mt-1 text-sm text-gray-400">
              Search for companies that already exist in the system
            </p>
            <div className="mt-4 grid grid-cols-2 gap-4">
              {fakeData.map((item, index) => (
                <div
                  key={index}
                  className="relative col-span-1 px-5 py-3.5 border border-gray-300 rounded-md hover:shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] transition-all duration-200 cursor-pointer
              shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
                  <div className="flex gap-4 items-center">
                    <div className="flex-shrink-0 h-12 w-12 border border-gray-200 rounded-lg">
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
                    <span className="line-clamp-1 text-[14px]">{item.scale}</span>
                  </div>

                  <div
                    onClick={() => setCompany(item)}
                    className="absolute right-4 text-sm top-1/2 -translate-y-1/2 bg-green-500 text-white px-3 py-1 rounded-3xl hover:bg-green-700 transition-all duration-200">
                    <span>Select</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {company && (
          <div className="relative bg-white p-4 mt-4 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] rounded-lg flex flex-col">
            <div className="flex items-center space-x-4 mb-4">
              <div className="rounded-full border border-slate-200 h-12 w-12 flex items-center justify-center">
                <img
                  src={company.logo}
                  alt=""
                />
              </div>
              <div>
                <h4 className="text-xl font-semibold">{company.displayName}</h4>
                <span className="text-[15px]">{company.address}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-sm g">
              <div className="grid grid-cols-2 justify-start">
                <label
                  className="font-semibold"
                  htmlFor="">
                  Field of activity:
                </label>
                <span>{company.fieldOfActivity}</span>
              </div>

              <div className="grid grid-cols-2 justify-start">
                <label
                  className="font-semibold"
                  htmlFor="">
                  Scale:
                </label>
                <span>{company.scale}</span>
              </div>

              <div className="grid grid-cols-2 justify-start">
                <label
                  className="font-semibold"
                  htmlFor="">
                  Website:
                </label>
                <span>{company.website ? company.website : '--'}</span>
              </div>
              <div className="grid grid-cols-2 justify-start">
                <label
                  className="font-semibold"
                  htmlFor="">
                  Email:
                </label>
                <span>{company.email}</span>
              </div>

              <div className="grid grid-cols-2 justify-start">
                <label
                  className="font-semibold"
                  htmlFor="">
                  Phone number:
                </label>
                <span>{company.phoneNumber}</span>
              </div>
              <div className="col-span-2 grid grid-cols-4 justify-start">
                <label
                  className="font-semibold col-span-1"
                  htmlFor="">
                  Address:
                </label>
                <span className="col-span-3">{company.address}</span>
              </div>
              <div className="col-span-2 grid grid-cols-4 justify-start">
                <label
                  className="font-semibold col-span-1"
                  htmlFor="">
                  Description:
                </label>
                <span className="col-span-3">{company.description}</span>
              </div>
            </div>

            <p
              onClick={() => setIsOpenModalAddEditCompany(true)}
              className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 bg-slate-200 rounded-md cursor-pointer">
              <HiOutlinePencilAlt /> Edit company
            </p>
          </div>
        )}
      </div>

      {isOpenModalAddEditCompany && (
        <ModalAddEditCompany
          open={isOpenModalAddEditCompany}
          setOpen={setIsOpenModalAddEditCompany}
          company={company}
        />
      )}
    </>
  )
}

export default InfoCompany