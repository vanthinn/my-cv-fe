import { FC } from 'react'
import logo from '../../../assets/images/logo.png'
import Button from '../../../components/Button'

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
  return (
    <div className="flex justify-between ">
      <div>
        <div>
          <img
            src={logo}
            alt="logo"
          />
        </div>
        <ul>
          {navList.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      </div>

      <div>
        <Button className="">Sign up</Button>
        <Button>Login</Button>
      </div>
    </div>
  )
}

export default Header
