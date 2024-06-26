import { Route, Routes } from 'react-router-dom'
import './App.css'
import { routerEmployer, routerUser } from './routes/router'
import Login from './pages/Auth/Login/Login'
import Register from './pages/Auth/Register'
import Notify from './components/Notify'
import { useStoreActions, useStoreState } from 'easy-peasy'
import {
  authActionSelector,
  authStateSelector,
  companyActionSelector,
  notifyActionSelector,
  notifyStateSelector,
  userActionSelector,
} from './store'
import { useEffect } from 'react'
import NotFound from './pages/NotFound'
import ProtectedRouteEmployer from './routes/ProtectedRouteEmployer/ProtectedRouteEmployer'
import ProtectedRouteUser from './routes/ProtectedRouteUser/ProtectedRouteUser'
import socket from './utils/socket/socketConfig'
import ForgotPassword from './pages/Auth/ForgotPassword'

function App() {
  const { notifySetting } = useStoreState(notifyStateSelector)
  const { setNotifySetting } = useStoreActions(notifyActionSelector)
  const { setCompany } = useStoreActions(companyActionSelector)

  const { getCurrentUser } = useStoreActions(userActionSelector)
  const { accessToken, isLoginSuccess } = useStoreState(authStateSelector)
  const { setAccessToken } = useStoreActions(authActionSelector)
  const auth: any = JSON.parse(String(localStorage.getItem('auth')))

  const getCurrentUserApp = async (): Promise<void> => {
    const res = await getCurrentUser()
    if (res.company) {
      setCompany(res.company)
    }
  }

  useEffect(() => {
    if (auth) {
      setAccessToken(auth.accessToken)
    } else {
      setAccessToken('')
    }
  }, [auth])

  useEffect(() => {
    if (accessToken) getCurrentUserApp()
  }, [accessToken])

  useEffect(() => {
    const auth: any = JSON.parse(String(localStorage.getItem('auth')))
    if (isLoginSuccess && auth?.accessToken) {
      socket.auth = {
        token: auth.accessToken,
      }

      socket.connect()
      socket.on('connect', () => {
        console.log('Socket connected')
      })
    }

    return () => {
      socket.off('connect')
      socket.disconnect()
    }
  }, [accessToken])
  return (
    <>
      <Routes>
        {routerUser.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={
              <ProtectedRouteUser>
                <route.layout>
                  <route.element />
                </route.layout>
              </ProtectedRouteUser>
            }
          />
        ))}

        {routerEmployer.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={
              <ProtectedRouteEmployer>
                <route.layout>
                  <route.element />
                </route.layout>
              </ProtectedRouteEmployer>
            }>
            {route.children?.map((child, childIndex) => (
              <Route
                key={`${index}-${childIndex}`}
                path={child.path}
                element={<child.element />}
              />
            ))}
          </Route>
        ))}

        <Route
          path="/auth/login"
          element={<Login />}
        />
        <Route
          path="/auth/register"
          element={<Register />}
        />

        <Route
          path="/employer/auth/login"
          element={<Login />}
        />
        <Route
          path="/employer/auth/register"
          element={<Register />}
        />

        <Route
          path="/auth/forgot-password"
          element={<ForgotPassword />}
        />
        <Route
          path="*"
          element={<NotFound />}
        />
      </Routes>

      <Notify
        notifySetting={notifySetting}
        setNotifySetting={setNotifySetting}
      />
    </>
  )
}

export default App
