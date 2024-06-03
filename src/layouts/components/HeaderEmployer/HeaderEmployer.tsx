import { FC, useEffect } from 'react'
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
  conversationActionSelector,
  conversationStateSelector,
  notifyActionSelector,
  userActionSelector,
  userStateSelector,
} from '../../../store'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import socket from '../../../utils/socket/socketConfig'
import { IMessage } from '../../../types/IConversation'

interface Props {}

const HeaderEmployer: FC<Props> = (props): JSX.Element => {
  const { id } = useParams()
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { setCompany } = useStoreActions(companyActionSelector)
  const { currentUserSuccess } = useStoreState(userStateSelector)
  const { setCurrentUserSuccess } = useStoreActions(userActionSelector)
  const { setNotifySetting } = useStoreActions(notifyActionSelector)
  const { setIsLoginSuccess, setMessageError } = useStoreActions(authActionSelector)

  const { setCurrentConverSationMessage, setListConversation } = useStoreActions(
    conversationActionSelector,
  )
  const { currentConverSationMessage, listConversation } = useStoreState(
    conversationStateSelector,
  )

  const handleNewMessage = (response: IMessage) => {
    console.log(response)
    const location = pathname.split('/')[1]

    if (
      location !== 'message' &&
      location !== 'employer' &&
      response?.author.id !== currentUserSuccess?.id
    ) {
      // setNotifyRealtime({ show: true, message: response, type: 'message' })
    } else {
      if (
        response?.author.id !== currentUserSuccess?.id &&
        response?.conversationId === id
      ) {
        setCurrentConverSationMessage([response, ...currentConverSationMessage])
      }
      const getConversationAdd = listConversation.find((item: any) => {
        return item.id === response.conversationId
      })
      if (getConversationAdd) {
        const newConversation = {
          ...getConversationAdd,
          isRead: response?.author.id === currentUserSuccess?.id,
          lastMessage: response,
        }
        const newList = listConversation.filter((item: any) => {
          return item.id !== response.conversationId
        })
        setListConversation([newConversation, ...newList])
      }
    }
  }

  useEffect(() => {
    socket.on('onMessage', handleNewMessage)
    return () => {
      socket.off('onMessage', handleNewMessage)
    }
  }, [id, currentUserSuccess?.id, listConversation, currentConverSationMessage])

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
