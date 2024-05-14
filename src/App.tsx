import { Route, Routes } from 'react-router-dom'
import './App.css'
import { routerEmployer, routerUser } from './routes/router'
import Login from './pages/Auth/Login/Login'
import Register from './pages/Auth/Register'

function App() {
  return (
    <>
      <Routes>
        {routerUser.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={
              <>
                <route.layout>
                  <route.element />
                </route.layout>
              </>
            }
          />
        ))}

        {routerEmployer.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={
              <route.layout>
                <route.element />
              </route.layout>
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
      </Routes>
    </>
  )
}

export default App
