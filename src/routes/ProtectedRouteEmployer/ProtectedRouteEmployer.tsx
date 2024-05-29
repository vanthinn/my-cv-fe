import { useStoreState } from 'easy-peasy'
import { FC } from 'react'
import { Navigate } from 'react-router-dom'
import { userStateSelector } from '../../store'

interface IProps {
  children: JSX.Element
}

const ProtectedRouteEmployer: FC<IProps> = ({ children }: IProps): JSX.Element => {
  const auth = localStorage.getItem('auth')
  const { currentUserSuccess } = useStoreState(userStateSelector)
  if (auth === null) {
    return <Navigate to="/employer/auth/login" />
  }

  if (currentUserSuccess && currentUserSuccess?.role?.name !== 'EMPLOYER') {
    return <Navigate to="*" />
  }

  return children
}

export default ProtectedRouteEmployer
