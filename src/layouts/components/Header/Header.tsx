import { FC } from 'react'
import logo from '../../../assets/images/logo.png'
import Button from '../../../components/Button'
import { Container } from '../../Container/Container'
import { HiArrowSmRight, HiOutlineBell } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'
import AvatarHeader from '../AvatarHeader/AvatarHeader'
import { Tooltip } from '@mui/material'
import { BsChatDots } from 'react-icons/bs'
import { useStoreState } from 'easy-peasy'
import { userStateSelector } from '../../../store'

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

const Header: FC<Props> = (props): JSX.Element => {
  const auth = localStorage.getItem('auth')
  const navigate = useNavigate()
  const handleChangeNav = (path: string) => {
    if (path === '/manager-cv' && auth === null) {
      navigate('/auth/login')
    } else navigate(path)
  }
  const { currentUserSuccess } = useStoreState(userStateSelector)
  return (
    <div className="fixed top-0 right-0 left-0  h-24 z-[999]  shadow-md bg-gradient-to-r from-gray-100 to-sky-100">
      <Container>
        <div className="flex justify-between items-center ">
          <div className="flex items-center">
            <div className="h-24 w-auto mr-8">
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
