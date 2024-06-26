import { useStoreState } from 'easy-peasy'
import { FC } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { userStateSelector } from '../../store'

interface IProps {
  children: JSX.Element
}

const ProtectedRouteUser: FC<IProps> = ({ children }: IProps): JSX.Element => {
  const auth = localStorage.getItem('auth')
  const { pathname } = useLocation()
  const path = pathname.split('/')[1]

  if (path === 'message' && !auth) {
    return <Navigate to="/auth/login" />
  }

  const { currentUserSuccess } = useStoreState(userStateSelector)

  if (currentUserSuccess && currentUserSuccess?.role?.name !== 'USER') {
    return <Navigate to="*" />
  }

  return children
}

export default ProtectedRouteUser
