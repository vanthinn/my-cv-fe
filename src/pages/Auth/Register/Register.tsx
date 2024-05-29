import React, { FC, useEffect } from 'react'
import './styles.css'
import {
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  FormHelperText,
} from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import { Controller } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useLocation, useNavigate } from 'react-router-dom'
import TextFieldCustom from '../../../components/TextField'
import Button from '../../../components/Button'
import { IUser } from '../../../types/IUser'
import { useStoreActions, useStoreState } from 'easy-peasy'
import {
  authActionSelector,
  authStateSelector,
  notifyActionSelector,
} from '../../../store'
import { ROLE_ID, TENANT } from '../../../common/constants'

interface Props {}

const defaultValues: IUser = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  phoneNumber: '',
}

const schema = yup.object().shape({
  firstName: yup.string().required('FirstName is required'),
  lastName: yup.string().required('LastName is required'),
  email: yup.string().required('Email is required').email('Email invalid'),
  password: yup.string().required('Password is required'),
  phoneNumber: yup.string().required('PhoneNumber is required'),
})

const Register: FC<Props> = (): JSX.Element => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { messageError, isSignUpSuccess } = useStoreState(authStateSelector)

  const { signUp, setIsSignUpSuccess } = useStoreActions(authActionSelector)
  const { setNotifySetting } = useStoreActions(notifyActionSelector)

  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const { handleSubmit, control } = useForm<IUser>({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  })

  const [showPassword, setShowPassword] = React.useState(false)

  useEffect(() => {
    if (!isSignUpSuccess && messageError !== '') {
      setNotifySetting({ show: true, status: 'error', message: messageError })
      setIsSignUpSuccess(true)
    }
  }, [isSignUpSuccess])

  const handleClickShowPassword = () => setShowPassword((show) => !show)

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  const onSubmit = async (data: IUser) => {
    setIsLoading(true)
    const checkEmployer = pathname.split('/')[1] === 'employer'
    const newData = checkEmployer
      ? { ...data, tenantId: TENANT.EMPLOYER, roleId: ROLE_ID.EMPLOYER }
      : { ...data, tenantId: TENANT.USER, roleId: ROLE_ID.USER }
    const res = await signUp(newData)
    if (res) {
      setNotifySetting({ show: true, status: 'success', message: 'Login successful' })
      checkEmployer ? navigate('/employer/auth/login') : navigate('/auth/login')
      setIsLoading(false)
    } else {
      setIsLoading(false)
    }
  }
  return (
    <div className="h-screen relative ">
      <div className="h-screen">
        <div className=" bg-gradient-to-b from-[#a1c4fd]  to-[#c2e9fb] w-full min-h-screen z-0"></div>
      </div>
      <div
        className="absolute top-[50%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center
                
 ">
        <div
          className="bg-white scrollable   z-50  rounded-[25px]  px-8 pb-14 
        shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]  max-h-[580px] overflow-y-auto">
          <h1 className="m-auto font-semibold text-center text-[28px] py-10">Register</h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col min-w-[280px]  gap-4 sm:container bg-opacity-50  ">
            <div className="flex gap-6">
              <div className="col-span-1">
                <Controller
                  name="firstName"
                  control={control}
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <TextFieldCustom
                      error={error}
                      onChange={onChange}
                      value={value}
                      label="FirstName *"
                    />
                  )}
                />
              </div>
              <div className="col-span-1">
                <Controller
                  name="lastName"
                  control={control}
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <TextFieldCustom
                      error={error}
                      onChange={onChange}
                      value={value}
                      label="LastName *"
                    />
                  )}
                />
              </div>
            </div>
            <Controller
              name="email"
              control={control}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <TextFieldCustom
                  error={error}
                  onChange={onChange}
                  value={value}
                  label="Email *"
                />
              )}
            />
            <Controller
              name="phoneNumber"
              control={control}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <TextFieldCustom
                  error={error}
                  onChange={onChange}
                  value={value}
                  label="Phone number *"
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <FormControl
                  sx={{
                    width: '100%',
                    '& .MuiFormControl-root': {
                      backgroundColor: '#000',
                    },
                  }}
                  error={!!error}
                  variant="standard">
                  <InputLabel htmlFor="standard-adornment-password">
                    Password *
                  </InputLabel>
                  <Input
                    sx={{ backgroundColor: 'rgba(255, 255, 255, 0.01)' }}
                    id="standard-adornment-password"
                    name="passWord"
                    type={showPassword ? 'text' : 'password'}
                    onChange={onChange}
                    value={value}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}>
                          {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  {!!error && (
                    <FormHelperText id="component-error-text">
                      {error.message}
                    </FormHelperText>
                  )}
                </FormControl>
              )}
            />

            <Button
              // typeButton="blue"
              className="mt-6"
              disabled={isLoading}
              loading={isLoading}>
              Register
            </Button>
          </form>
          <p className="mt-4 text-xs text-center">
            Have an account?{' '}
            <span
              onClick={() => navigate('/auth/login')}
              className="cursor-pointer text-blue-500 hover:text-blue-700 hover:underline">
              Login now
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register
