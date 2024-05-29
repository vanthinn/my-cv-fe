import { useStoreState } from 'easy-peasy'
import { FC } from 'react'
import { Navigate } from 'react-router-dom'
import { userStateSelector } from '../../store'

interface IProps {
  children: JSX.Element
}

const ProtectedRouteUser: FC<IProps> = ({ children }: IProps): JSX.Element => {
  // const auth = localStorage.getItem('auth')
  const { currentUserSuccess } = useStoreState(userStateSelector)

  if (currentUserSuccess && currentUserSuccess?.role?.name !== 'USER') {
    return <Navigate to="*" />
  }

  return children
}

export default ProtectedRouteUser
