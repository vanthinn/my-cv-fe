import { useStoreActions, useStoreState } from 'easy-peasy'
import { FC, useEffect, useState } from 'react'
import { IoPersonCircleOutline, IoChevronDownSharp } from 'react-icons/io5'
import {
  HiUserPlus,
  HiArrowRightOnRectangle,
  HiOutlineUserGroup,
  HiChevronUp,
} from 'react-icons/hi2'
import { useNavigate } from 'react-router-dom'
import OptionGroup from '../OptionGroup'
import {
  conversationActionSelector,
  conversationStateSelector,
  notifyActionSelector,
  userStateSelector,
} from '../../../../store'

interface Props {}

const DetailConversation: FC<Props> = (): JSX.Element => {
  const navigate = useNavigate()
  const { setNotifySetting } = useStoreActions(notifyActionSelector)
  const { setIsDeleteMemberOfConversationSuccess } = useStoreActions(
    conversationActionSelector,
  )
  const { messageError, isDeleteMemberOfConversationSuccess, currentConversation } =
    useStoreState(conversationStateSelector)
  const { currentUserSuccess } = useStoreState(userStateSelector)
  // const [isOpenAddUser, setIsOpenAddUser] = useState<boolean>(false)
  // const [openModalDelete, setOpenModalDelete] = useState<boolean>(false)
  const [openDropDownSettings, setOpenDropDownSettings] = useState<boolean>(false)
  // const [openModalEditNickName, setOpenModalEditNickName] = useState<boolean>(false)

  // const handleOutConversation = async (): Promise<void> => {
  //   const res = await deleteMemberOfConversation({
  //     conversationId: currentConversation?.id,
  //     userId: currentUserSuccess?.id,
  //   })
  //   if (res) {
  //     const newList = listConversation.filter((item) => {
  //       return item.id !== currentConversation?.id
  //     })
  //     setListConversation(newList)
  //     setCurrentConversation(null)
  //     navigate('/message')
  //   }
  // }

  useEffect(() => {
    if (!isDeleteMemberOfConversationSuccess) {
      setNotifySetting({
        show: true,
        status: 'error',
        message: messageError,
      })
      setIsDeleteMemberOfConversationSuccess(true)
    }
  }, [isDeleteMemberOfConversationSuccess])

  return (
    <>
      <div
        className="col-span-2 border-l border-gray-300 flex flex-col py-4 items-center px-2 overflow-y-auto"
        style={{ maxHeight: 'calc(100vh - 62px)' }}>
        <img
          className="h-20 w-20 rounded-full border border-gray-500 object-cover flex-shrink-0"
          src={currentConversation?.avatarUrl}
          alt={currentConversation?.displayName}
        />

        <span className="font-semibold text-lg">{currentConversation?.displayName}</span>
        {currentConversation?.type === 'CHAT' && (
          <div
            className="flex flex-col items-center justify-center mt-4"
            onClick={() => {
              const userProfile = currentConversation.users.filter((user) => {
                return user.userId !== currentUserSuccess?.id
              })
              if (userProfile.length > 0) navigate('/profile/' + userProfile[0]?.userId)
            }}>
            <IoPersonCircleOutline className="h-8 w-8 p-1 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300" />
            <span className="text-sm">Trang cá nhân</span>
          </div>
        )}
        {currentConversation?.type === 'GROUP_CHAT' && !currentConversation.forumId && (
          <div className="flex gap-4">
            <div
              className="flex flex-col items-center justify-center mt-4"
              // onClick={() => setIsOpenAddUser(true)}
            >
              <HiUserPlus className="h-8 w-8 p-1 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300" />
              <span className="text-sm">Mời</span>
            </div>
            <div
              className="flex flex-col items-center justify-center mt-4 text-red-500"
              // onClick={() => setOpenModalDelete(true)}
            >
              <HiArrowRightOnRectangle className="h-8 w-8 p-1 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300" />
              <span className="text-sm ">Rời khỏi</span>
            </div>
          </div>
        )}

        <div className="font-semibold mt-4 w-full px-2 py-1 flex justify-between items-center hover:bg-gray-200 cursor-pointer transition-all duration-200 rounded-md">
          <span>File phương tiện</span>
          <IoChevronDownSharp className="h-5 w-5 mr-4" />
        </div>

        <div
          onClick={() => setOpenDropDownSettings(!openDropDownSettings)}
          className="font-semibold w-full px-2 py-1 flex justify-between items-center hover:bg-gray-200 cursor-pointer transition-all duration-200 rounded-md">
          <span>Tùy chỉnh đoạn chat</span>
          {openDropDownSettings ? (
            <HiChevronUp className="h-5 w-5 mr-4 font-bold" />
          ) : (
            <IoChevronDownSharp className="h-5 w-5 mr-4" />
          )}
        </div>

        <div
          className={`flex flex-col w-full mb-2 mt-1 text-base ${
            openDropDownSettings ? 'h-auto' : 'h-0 overflow-hidden'
          }  transition-all duration-1000`}>
          <div
            // onClick={() => setOpenModalEditNickName(true)}
            className="font-semibold w-full px-2 py-1 flex items-center hover:bg-gray-200 cursor-pointer transition-all duration-200 rounded-md">
            <HiOutlineUserGroup className="h-5 w-5 mr-2" />
            <span>Chỉnh sửa biệt danh</span>
          </div>
        </div>

        {currentConversation?.type === 'GROUP_CHAT' && (
          <div className="w-full flex flex-col">
            <span className=" px-2 py-1">Thành viên của nhóm</span>
            <ul>
              {currentConversation.users !== undefined &&
                currentConversation.users.map((item, index) => (
                  <li
                    key={index}
                    className="relative group list-none flex justify-between items-center py-1.5 px-2  text-left clear-both whitespace-nowrap rounded-md hover:bg-gray-200 hover:text-primary-400 cursor-pointer group-hover:opacity-80 transition-all duration-200   ">
                    <a className="relative w-full  flex ">
                      <img
                        className="h-8 w-8 flex-shrink-0 rounded-full border border-gray-700 bg-gray-700 object-cover mr-2 inline"
                        src={item.user.avatarUrl}
                        alt="avatar"
                      />
                      <span className="font-semibold text-sm">
                        {item.user.firstName + ' ' + item.user.lastName}
                      </span>
                    </a>
                    <OptionGroup id={item.userId} />
                  </li>
                ))}
            </ul>
          </div>
        )}
      </div>
      {/* {isOpenAddUser && (
        <AddUserToGroup
          isOpen={isOpenAddUser}
          setIsOpen={setIsOpenAddUser}
          handleAction={handleAddUser}
        />
      )} */}

      {/* {openModalDelete && (
        <ModalConfirm
          open={openModalDelete}
          handleClose={() => {
            setOpenModalDelete(false)
          }}
          handleDelete={handleOutConversation}
        />
      )} */}

      {/* {openModalEditNickName && (
        <ModalEditNickName
          open={openModalEditNickName}
          setOpen={setOpenModalEditNickName}
           handleDelete={handleOutConversation}
        />
      )} */}
    </>
  )
}

export default DetailConversation
