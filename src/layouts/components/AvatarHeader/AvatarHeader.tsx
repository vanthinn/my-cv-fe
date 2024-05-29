import { Transition } from '@headlessui/react'
import { FC, Fragment, useState } from 'react'
import { ArrowRightEndOnRectangleIcon, Cog6ToothIcon } from '@heroicons/react/24/outline'
import { Tooltip } from '@mui/material'
import { useClickOutside } from '../../../hooks/useClickOutside'
import avatar from '../../../assets/images/avatar_default.png'
import ModalChangePassword from '../../../components/ModalChangePassword'
import { useStoreActions, useStoreState } from 'easy-peasy'
import {
  authActionSelector,
  notifyActionSelector,
  userActionSelector,
  userStateSelector,
} from '../../../store'
import { useNavigate } from 'react-router-dom'
import ModalEditProfile from '../../../components/ModalEditProfile/ModalEditProfile'
import { HiOutlineBookmark } from 'react-icons/hi'
import { AiOutlineFieldTime } from 'react-icons/ai'

interface Props {}

const AvatarHeader: FC<Props> = (): JSX.Element => {
  const navigate = useNavigate()
  const { currentUserSuccess } = useStoreState(userStateSelector)
  const { setCurrentUserSuccess } = useStoreActions(userActionSelector)
  const { setNotifySetting } = useStoreActions(notifyActionSelector)
  const { setIsLoginSuccess, setMessageError } = useStoreActions(authActionSelector)
  const [open, setOpen] = useState<boolean>(false)
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [openModalEditProfile, setOpenModalEditProfile] = useState<boolean>(false)

  let elementRef: any = useClickOutside(() => {
    if (open) {
      setOpen(false)
    }
  })
  const _logout = (): void => {
    navigate('/')
    localStorage.removeItem('auth')
    setCurrentUserSuccess(null)
    setMessageError('')
    setIsLoginSuccess(false)
    setNotifySetting({ show: true, status: 'success', message: 'Log out successfully' })
  }
  return (
    <>
      <div className="relative">
        <div
          className="flex text-sm rounded-full focus:outline-none cursor-pointer"
          id="user-menu-button"
          onClick={() => setOpen(!open)}>
          <div className="relative">
            {open && (
              <div className="flex items-center bg-white px-2 py-2 rounded-3xl">
                <img
                  className="h-8 w-8 rounded-full border border-gray-700  object-contain mr-2"
                  src={currentUserSuccess?.avatarUrl || avatar}
                  alt="avatar"
                />
                <span>
                  {currentUserSuccess?.firstName + ' ' + currentUserSuccess?.lastName}
                </span>
              </div>
            )}
            {!open && (
              <div className="flex items-center bg-white px-2 py-2 rounded-3xl">
                <Tooltip title={<h1 className="text-sm">Account </h1>}>
                  <img
                    className="h-8 w-8 rounded-full border border-gray-700  object-contain mr-2"
                    src={currentUserSuccess?.avatarUrl || avatar}
                    alt="avatar"
                  />
                </Tooltip>
                <span>
                  {currentUserSuccess?.firstName + ' ' + currentUserSuccess?.lastName}
                </span>
              </div>
            )}
          </div>
        </div>
        <Transition
          show={open}
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95">
          <ul
            ref={elementRef}
            onClick={() => {
              setOpen(!open)
            }}
            className={`absolute rounded right-2 top-[120%] z-50 py-0.5 bg-white border shadow-md w-auto`}
            style={{ minWidth: '17rem' }}>
            <li className="relative group list-none">
              <a
                onClick={() => setOpenModalEditProfile(true)}
                className="block w-full py-4 px-6 clear-both whitespace-nowrap hover:text-primary-400 cursor-pointer group-hover:opacity-50 ">
                <img
                  className="h-8 w-8 rounded-full border border-gray-500 bg-gray-5  00 object-cover mr-2.5 inline"
                  src={currentUserSuccess?.avatarUrl || avatar}
                  alt="avatar"
                />
                <span className="font-semibold">
                  {currentUserSuccess?.firstName + ' ' + currentUserSuccess?.lastName}
                </span>
              </a>
            </li>
            <li className="relative list-none">
              <hr className="border-t border-gray-200 my-0" />
            </li>
            <li className="relative group list-none hover:bg-gray-100 ">
              <a
                onClick={() => setOpenModal(true)}
                className="block w-full py-2 px-6 clear-both whitespace-nowrap hover:text-primary-400 cursor-pointer group-hover:opacity-50 ">
                <Cog6ToothIcon className="inline w-4 h-4 mr-2 mb-0.5" />
                <span>Change password</span>
              </a>
            </li>

            <li className="relative list-none">
              <hr className="border-t border-gray-200 my-0" />
            </li>
            <li className="relative group list-none hover:bg-gray-100 ">
              <a
                onClick={() => navigate('/list-bookmark')}
                className="block w-full py-2 px-6 clear-both whitespace-nowrap hover:text-primary-400 cursor-pointer group-hover:opacity-50 ">
                <HiOutlineBookmark className="inline w-4 h-4 mr-2 mb-0.5" />
                <span>List bookmark</span>
              </a>
            </li>

            <li className="relative list-none ">
              <hr className="border-t border-gray-200 my-0" />
            </li>
            <li className="relative group list-none hover:bg-gray-100 ">
              <a
                onClick={() => navigate('/history')}
                className="block w-full py-2 px-6 clear-both whitespace-nowrap hover:text-primary-400 cursor-pointer group-hover:opacity-50 ">
                <AiOutlineFieldTime className="inline w-4 h-4 mr-2 mb-0.5" />
                <span>History</span>
              </a>
            </li>

            <li className="relative list-none ">
              <hr className="border-t border-gray-200 my-0" />
            </li>
            <li className="relative group list-none hover:bg-gray-100">
              <a
                className="block w-full py-2 px-6 clear-both whitespace-nowrap hover:text-primary-400 cursor-pointer text-red-600 group-hover:opacity-70"
                onClick={_logout}>
                <ArrowRightEndOnRectangleIcon className="inline w-4 h-4 text-red-600 mr-2 mb-0.5" />
                <span>Logout</span>
              </a>
            </li>
          </ul>
        </Transition>
      </div>

      {openModal && (
        <ModalChangePassword
          open={openModal}
          setOpen={setOpenModal}
        />
      )}

      {openModalEditProfile && (
        <ModalEditProfile
          open={openModalEditProfile}
          setOpen={setOpenModalEditProfile}
        />
      )}
    </>
  )
}

export default AvatarHeader
