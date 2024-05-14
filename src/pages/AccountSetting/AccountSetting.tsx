import { FC } from 'react'
import {
  HiOutlineDocumentText,
  HiOutlineLockClosed,
  HiOutlineOfficeBuilding,
  HiOutlineUser,
} from 'react-icons/hi'
import { Link, Outlet } from 'react-router-dom'

interface Props {}

const Navbar = () => {
  return (
    <ul className="border border-slate-300 h-full rounded-md overflow-hidden  ">
      <li className="">
        <Link
          to="profile"
          className="text-sm font-medium px-3 py-2 border-b border-gray-300 hover:bg-slate-200 cursor-pointer flex items-center gap-2">
          <HiOutlineUser />
          Profile
        </Link>
      </li>
      <li className="">
        <Link
          to="info-company"
          className="text-sm font-medium px-3 py-2 border-b border-gray-300 hover:bg-slate-200 cursor-pointer flex items-center gap-2">
          <HiOutlineOfficeBuilding />
          Information company
        </Link>
      </li>
      <li className="">
        <Link
          to="change-password"
          className="text-sm font-medium px-3 py-2 border-b border-gray-300 hover:bg-slate-200 cursor-pointer flex items-center gap-2">
          <HiOutlineLockClosed />
          Change Password
        </Link>
      </li>
      <li className="">
        <Link
          to="business-license"
          className="text-sm font-medium px-3 py-2 border-b border-gray-300 hover:bg-slate-200 cursor-pointer flex items-center gap-2">
          <HiOutlineDocumentText />
          Business license
        </Link>
      </li>
    </ul>
  )
}

const AccountSetting: FC<Props> = (props): JSX.Element => {
  return (
    <div className="p-4 bg-white rounded-md flex-1 flex flex-col shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]">
      <h4 className="font-semibold text-xl"> Account setting</h4>
      <div className="grid grid-cols-5 mt-4 flex-1 gap-4">
        <div className="col-span-1 flex-1">
          <Navbar />
        </div>
        <div className="col-span-4 flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default AccountSetting
