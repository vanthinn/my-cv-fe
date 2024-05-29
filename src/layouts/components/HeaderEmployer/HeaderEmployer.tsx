import { FC } from 'react'
import logo from '../../../assets/images/logongang.png'
import {
  HiOutlineBell,
  HiOutlineChat,
  HiOutlineLogout,
  HiOutlineUserCircle,
} from 'react-icons/hi'
import { AiFillCaretDown } from 'react-icons/ai'
import { useStoreActions, useStoreState } from 'easy-peasy'
import {
  authActionSelector,
  companyActionSelector,
  notifyActionSelector,
  userActionSelector,
  userStateSelector,
} from '../../../store'
import { useNavigate } from 'react-router-dom'

interface Props {}

const HeaderEmployer: FC<Props> = (props): JSX.Element => {
  const navigate = useNavigate()
  const { setCompany } = useStoreActions(companyActionSelector)
  const { currentUserSuccess } = useStoreState(userStateSelector)
  const { setCurrentUserSuccess } = useStoreActions(userActionSelector)
  const { setNotifySetting } = useStoreActions(notifyActionSelector)
  const { setIsLoginSuccess, setMessageError } = useStoreActions(authActionSelector)

  const _logout = (): void => {
    navigate('/')
    localStorage.removeItem('auth')
    setCompany(null)
    setCurrentUserSuccess(null)
    setMessageError('')
    setIsLoginSuccess(false)
    setNotifySetting({ show: true, status: 'success', message: 'Log out successfully' })
  }
  return (
    <div className="fixed top-0 right-0 left-0  h-16 z-[999]  bg-[#A8D0E6] px-8">
      <div className="flex justify-between items-center">
        <div className="h-16  ">
          <img
            className="h-full w-full object-cover transform scale-125"
            src={logo}
            alt=""
          />
        </div>

        <div className="flex gap-3">
          <div className="flex gap-1 items-center px-2 cursor-pointer py-1 rounded-full bg-white hover:bg-slate-200">
            <HiOutlineBell className="text-xl" />
          </div>
          <div className="flex gap-1 items-center px-2 cursor-pointer py-1 rounded-full bg-white hover:bg-slate-200">
            <HiOutlineChat className="text-xl" />
            <span className="text-sm">Chat</span>
          </div>
          <div className="group relative flex gap-2 items-center px-2 cursor-pointer py-1 rounded-full bg-white">
            <HiOutlineUserCircle className="text-xl" />
            <span className="text-sm">
              {currentUserSuccess?.firstName + ' ' + currentUserSuccess?.lastName}
            </span>
            <AiFillCaretDown />

            <div
              onClick={() => _logout()}
              className="absolute group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 
            top-[110%] opacity-0 transform translate-y-4 right-0 flex items-center bg-white text-red-600 rounded-md px-8 shadow-md py-1 hover:bg-slate-100 gap-2">
              <HiOutlineLogout className="text-xl" />
              <span className="text-sm">Log out</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeaderEmployer
