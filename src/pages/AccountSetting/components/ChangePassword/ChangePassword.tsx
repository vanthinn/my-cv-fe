import { FC, useState } from 'react'
import { IOption } from '../../../../types/ICommon'
import { Gender } from '../../../../common/enum'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { IDataChangePassword } from '../../../../components/ModalChangePassword/ModalChangePassword'
import TextFieldV2 from '../../../../components/TextFieldV2'
import Button from '../../../../components/Button'

interface Props {}

const schema = yup.object().shape({
  password: yup.string().required('Password is required'),
  newPassword: yup.string().required('New Password is required'),
  confirmPassword: yup
    .string()
    .required('Confirm password is required')
    .oneOf([yup.ref('newPassword')], 'Passwords must match'),
})

const ChangePassword: FC<Props> = (props): JSX.Element => {
  const defaultValues: IDataChangePassword = {
    password: '',
    newPassword: '',
    confirmPassword: '',
  }

  const { handleSubmit, control } = useForm<IDataChangePassword>({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  })

  const [loading, setLoading] = useState<boolean>(false)

  const onSubmit = async (data: IDataChangePassword): Promise<void> => {}
  return (
    <div className="flex flex-col border border-slate-200 flex-1 h-full px-4 py-2 rounded-md">
      <h4 className="font-semibold">Change password</h4>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="col-span-1 flex flex-col mt-2">
          <label
            htmlFor=""
            className="font-semibold text-sm text-gray-500">
            Password <span className="text-red-600">*</span>
          </label>
          <Controller
            name="password"
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextFieldV2
                error={error}
                onChange={onChange}
                value={value}
                password
                width="300px"
                className="!px-4 !py-1.5"
              />
            )}
          />
        </div>
        <div className="col-span-1 flex flex-col mt-2">
          <label
            htmlFor=""
            className="font-semibold text-sm text-gray-500">
            New password <span className="text-red-600">*</span>
          </label>
          <Controller
            name="newPassword"
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextFieldV2
                error={error}
                onChange={onChange}
                value={value}
                password
                width="300px"
                className="!px-4 !py-1.5"
              />
            )}
          />
        </div>
        <div className="col-span-1 flex flex-col mt-2">
          <label
            htmlFor=""
            className="font-semibold text-sm text-gray-500">
            Confirm Password <span className="text-red-600">*</span>
          </label>
          <Controller
            name="confirmPassword"
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextFieldV2
                error={error}
                onChange={onChange}
                value={value}
                password
                width="300px"
                className="!px-4 !py-1.5"
              />
            )}
          />
        </div>
        <div className="mt-4 w-[300px] flex justify-between">
          <Button
            typeButton="cancel"
            onClick={(e) => {
              e.preventDefault()
            }}
            className="px-2 py-1">
            Cancel
          </Button>
          <Button
            type="submit"
            className="px-2 py-1">
            Save
          </Button>
        </div>
      </form>
    </div>
  )
}

export default ChangePassword
