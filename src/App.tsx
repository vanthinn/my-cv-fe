import { Route, Routes } from 'react-router-dom'
import './App.css'
import { routerUser } from './routes/router'
import Login from './pages/Auth/Login/Login'
import Register from './pages/Auth/Register'

function App() {
  return (
    <>
      <Routes>
        {routerUser.map((route, index) => {
          return (
            <Route
              key={index}
              path={route.path}
              element={
                // <ProtectedRoute>
                <>
                  <route.layout>
                    <route.element />
                  </route.layout>
                </>
                // </ProtectedRoute>
              }></Route>
          )
        })}

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
