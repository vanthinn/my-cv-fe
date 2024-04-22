import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers'
import store from './store/index.ts'
import { StoreProvider } from 'easy-peasy'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <StoreProvider store={store}>
        <App />
      </StoreProvider>
    </LocalizationProvider>
  </BrowserRouter>,
)
