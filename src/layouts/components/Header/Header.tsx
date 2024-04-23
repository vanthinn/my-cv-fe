import { FC } from 'react'
import logo from '../../../assets/images/logo.png'
import Button from '../../../components/Button'
import { Container } from '../../Container/Container'
import { HiArrowSmRight } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'

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
  const navigate = useNavigate()
  const handleChangeNav = (path: string) => {
    navigate(path)
  }
  return (
    <div className="fixed top-0 right-0 left-0  h-24  shadow-md bg-gradient-to-r from-gray-100 to-sky-100">
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

          <div className="flex gap-6">
            <Button
              typeButton="outline"
              className="hover:transform hover:translate-y-[-4px]">
              Sign up
            </Button>
            <Button className="hover:transform hover:translate-y-[-4px] ">Login</Button>
            <Button
              typeButton="black"
              className="hover:transform hover:translate-y-[-4px] ">
              For Employers <HiArrowSmRight className="ml-2 text-xl" />
            </Button>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Header
