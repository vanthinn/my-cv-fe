import { Route, Routes } from 'react-router-dom'
import './App.css'
import { routerUser } from './routes/router'

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
      </Routes>
    </>
  )
}

export default App
