import { FC, useEffect } from 'react'
import logo from '../../../assets/images/logo.png'
import Button from '../../../components/Button'
import { Container } from '../../Container/Container'
import { HiArrowSmRight, HiOutlineBell } from 'react-icons/hi'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import AvatarHeader from '../AvatarHeader/AvatarHeader'
import { Tooltip } from '@mui/material'
import { BsChatDots } from 'react-icons/bs'
import { useStoreActions, useStoreState } from 'easy-peasy'
import {
  conversationActionSelector,
  conversationStateSelector,
  userStateSelector,
} from '../../../store'
import { IMessage } from '../../../types/IConversation'
import socket from '../../../utils/socket/socketConfig'

interface Props {}

const navList = [
  {
    id: 1,
    name: 'JOBS',
    path: '/',
  },
  {
    id: 2,
    name: 'CV',
    path: '/manager-cv',
  },
  {
    id: 3,
    name: 'COMPANIES',
    path: '/company',
  },
  {
    id: 4,
    name: 'BLOG',
    path: '/blog',
  },
]

const Header: FC<Props> = (): JSX.Element => {
  const { id } = useParams()
  const auth = localStorage.getItem('auth')
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const handleChangeNav = (path: string) => {
    if (path === '/manager-cv' && auth === null) {
      navigate('/auth/login')
    } else navigate(path)
  }
  const { currentUserSuccess } = useStoreState(userStateSelector)
  const { setCurrentConverSationMessage, setListConversation } = useStoreActions(
    conversationActionSelector,
  )
  const { currentConverSationMessage, listConversation } = useStoreState(
    conversationStateSelector,
  )

  const handleNewMessage = (response: IMessage) => {
    console.log(response)
    const location = pathname.split('/')[1]

    if (location !== 'message' && response?.author.id !== currentUserSuccess?.id) {
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
  return (
    <div className="fixed top-0 right-0 left-0  h-24 z-[999]  shadow-md bg-gradient-to-r from-gray-100 to-sky-100">
      <Container>
        <div className="flex justify-between items-center ">
          <div className="flex items-center">
            <div
              onClick={() => navigate('/')}
              className="h-24 w-auto mr-8 cursor-pointer">
              <img
                className="h-full w-full object-cover "
                src={logo}
                alt="logo"
              />
            </div>
            <ul className="flex">
              {navList.map((item) => (
                <li
                  key={item.id}
                  className="mx-4 py-1 cursor-pointer uppercase transition-all duration-300 
                  bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent
                  hover:transform hover:translate-y-[-4px]
                  "
                  onClick={() => handleChangeNav(item.path)}>
                  {item.name}
                </li>
              ))}
            </ul>
          </div>

          {!currentUserSuccess ? (
            <div className="flex gap-6">
              <Button
                onClick={() => navigate('/auth/register')}
                typeButton="outline"
                className="hover:transform hover:translate-y-[-4px]">
                Sign up
              </Button>
              <Button
                onClick={() => navigate('/auth/login')}
                className="hover:transform hover:translate-y-[-4px] ">
                Login
              </Button>
              <Button
                onClick={() => navigate('/employer/auth/login')}
                typeButton="black"
                className="hover:transform hover:translate-y-[-4px] ">
                For Employers <HiArrowSmRight className="ml-2 text-xl" />
              </Button>
            </div>
          ) : (
            <div className="flex gap-5 items-center">
              <div className="px-2.5 bg-white rounded-full py-2">
                <Tooltip title={<h1 className="text-sm">Notification</h1>}>
                  <div>
                    <HiOutlineBell
                      // onClick={() => navigate('/message')}
                      className=" text-[#5ba5e9] cursor-pointer text-[27px]"
                    />
                  </div>
                </Tooltip>
              </div>
              <div className="px-2.5 bg-white rounded-full py-2">
                <Tooltip title={<h1 className="text-sm">Message</h1>}>
                  <div>
                    <BsChatDots
                      onClick={() => navigate('/message')}
                      className=" text-[#5ba5e9] cursor-pointer text-[28px]"
                    />
                  </div>
                </Tooltip>
              </div>
              <AvatarHeader />
            </div>
          )}
        </div>
      </Container>
    </div>
  )
}

export default Header
