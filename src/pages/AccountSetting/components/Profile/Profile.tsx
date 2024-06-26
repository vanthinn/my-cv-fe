import { FC, useEffect, useRef, useState } from 'react'
import { IProfileCV } from '../../../../types/IResume'
import { IOption, Image } from '../../../../types/ICommon'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import TextFieldV2 from '../../../../components/TextFieldV2'
import MultiImage from '../../../../components/MultiImage'
import Selected from '../../../../components/Select'
import DateTimePicker from '../../../../components/DateTimePicker'
import { Gender } from '../../../../common/enum'
import Button from '../../../../components/Button'
import { useStoreActions, useStoreState } from 'easy-peasy'
import {
  notifyActionSelector,
  userActionSelector,
  userStateSelector,
} from '../../../../store'

interface Props {}

const optionsGender: IOption[] = [
  {
    id: Gender.MALE,
    name: Gender.MALE,
  },
  {
    id: Gender.FEMALE,
    name: Gender.FEMALE,
  },
  {
    id: Gender.OTHER,
    name: Gender.OTHER,
  },
]

const schema = yup.object().shape({
  firstName: yup.string().required('FirstName is required'),
  lastName: yup.string().required('LastName is required'),
  avatarUrl: yup.string().required('AvatarUrl is required'),
  dateOfBirth: yup
    .string()
    .required('Date of birth is required')
    .test('is-18', 'You must be at least 18 years old', function (value) {
      const today = new Date()
      const birthDate = new Date(value)
      const age = today.getFullYear() - birthDate.getFullYear()
      const monthDifference = today.getMonth() - birthDate.getMonth()

      // Adjust age if the birth date has not occurred yet this year
      if (
        monthDifference < 0 ||
        (monthDifference === 0 && today.getDate() < birthDate.getDate())
      ) {
        return age > 18
      }

      return age >= 18
    }),
  phoneNumber: yup.string().required('Phone number is required'),
  email: yup.string().required('Email is required'),
  gender: yup.string().required('Gender is required'),
})

const Profile: FC<Props> = (): JSX.Element => {
  const { currentUserSuccess, isEditUserSuccess, messageErrorUser } =
    useStoreState(userStateSelector)
  const { postImage, editEdit, setIsEditUserSuccess, setCurrentUserSuccess } =
    useStoreActions(userActionSelector)
  const { setNotifySetting } = useStoreActions(notifyActionSelector)
  const ImageRef: any = useRef()
  const [Images, setImages] = useState<Image[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isLoadingForm, setIsLoadingForm] = useState<boolean>(false)

  const defaultValues: IProfileCV = {
    id: currentUserSuccess?.id || '',
    firstName: currentUserSuccess?.firstName || '',
    lastName: currentUserSuccess?.lastName || '',
    avatarUrl: currentUserSuccess?.avatarUrl || '',
    dateOfBirth: currentUserSuccess?.dateOfBirth || '',
    phoneNumber: currentUserSuccess?.phoneNumber || '',
    email: currentUserSuccess?.email || '',
    gender: currentUserSuccess?.gender || '',
    address: currentUserSuccess?.address || '',
  }

  const { handleSubmit, control, setValue } = useForm<IProfileCV>({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  })

  useEffect(() => {
    if (currentUserSuccess?.avatarUrl) {
      const imagePreview: Image[] = [
        {
          name: currentUserSuccess?.lastName || '',
          fileUrl: currentUserSuccess?.avatarUrl || '',
        },
      ]
      setImages(imagePreview)
    }
  }, [])

  const _deleteImage = () => {
    setImages([])
    setValue('avatarUrl', '')
  }

  const getUrlImage = async (file: any): Promise<void> => {
    setIsLoading(true)
    const formData = new FormData()
    formData.append(`documents`, file[0])
    const resImage = await postImage(formData)
    if (resImage) {
      setValue('avatarUrl', resImage[0].fileUrl)
    }
    setIsLoading(false)
  }

  const handleFileChange = (file: any) => {
    getUrlImage(file)
    const newFiles: any = Array.from(file)
    let newImages = [...newFiles]
    const newImagePreview: any = newImages.map((fileImage: any) => {
      if (fileImage.size) {
        return {
          name: fileImage.name.split('.')[0],
          fileUrl: URL.createObjectURL(fileImage),
        }
      }
      return fileImage
    })
    setImages(newImagePreview)
  }

  const onSubmit = async (data: any) => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setIsLoadingForm(true)
    const res = await editEdit(data)
    if (res.status === 200) {
      setNotifySetting({
        show: true,
        status: 'success',
        message: 'Edit user successfully',
      })
      setCurrentUserSuccess(res.data)
    }
    setIsLoadingForm(false)
  }

  useEffect(() => {
    if (!isEditUserSuccess) {
      setNotifySetting({
        show: true,
        status: 'error',
        message: messageErrorUser,
      })
      setIsEditUserSuccess(true)
    }
  }, [isEditUserSuccess])
  return (
    <div className="flex flex-col border border-slate-200 flex-1 h-full px-4 py-4 rounded-md">
      <h4 className="font-semibold text-xl">Profile</h4>

      <form
        className="mt-4 flex-1"
        onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-3 gap-8 flex-1">
          <div className="col-span-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-1 flex flex-col">
                <label
                  htmlFor=""
                  className="font-semibold text-gray-700">
                  First name <span className="text-red-600">*</span>
                </label>
                <Controller
                  name="firstName"
                  control={control}
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <TextFieldV2
                      error={error}
                      onChange={onChange}
                      value={value}
                    />
                  )}
                />
              </div>
              <div className="col-span-1 flex flex-col ml-4">
                <label
                  htmlFor=""
                  className="font-semibold text-gray-700">
                  Last name <span className="text-red-600">*</span>
                </label>
                <Controller
                  name="lastName"
                  control={control}
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <TextFieldV2
                      error={error}
                      onChange={onChange}
                      value={value}
                    />
                  )}
                />
              </div>

              <div className="col-span-1 flex flex-col ">
                <label
                  htmlFor=""
                  className="font-semibold text-gray-700">
                  Gender <span className="text-red-600">*</span>
                </label>
                <Controller
                  name="gender"
                  control={control}
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <Selected
                      error={error}
                      onChange={onChange}
                      value={value}
                      options={optionsGender}
                      empty="Select gender"
                    />
                  )}
                />
              </div>

              <div className="col-span-1 flex flex-col ml-4">
                <label
                  htmlFor=""
                  className="font-semibold text-gray-700">
                  Date of birth <span className="text-red-600">*</span>
                </label>
                <Controller
                  name="dateOfBirth"
                  control={control}
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <DateTimePicker
                      error={error}
                      onChange={onChange}
                      value={value}
                    />
                  )}
                />
              </div>

              <div className="col-span-2 flex flex-col">
                <label
                  htmlFor=""
                  className="font-semibold text-gray-700">
                  Address
                </label>
                <Controller
                  name="address"
                  control={control}
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <TextFieldV2
                      error={error}
                      onChange={onChange}
                      value={value}
                    />
                  )}
                />
              </div>
            </div>
          </div>

          <div className="col-span-1">
            <label
              htmlFor=""
              className="font-semibold text-gray-700">
              Avatar<span className="text-red-600">*</span>
            </label>
            <Controller
              name="avatarUrl"
              control={control}
              render={({ field: {}, fieldState: { error } }) => (
                <>
                  <MultiImage
                    single={true}
                    listImage={Images}
                    deleteImage={_deleteImage}
                    handleFileChange={handleFileChange}
                    InputRef={ImageRef}
                    loading={isLoading}
                  />
                  {error && (
                    <span className="text-red-600 text-sm">{error?.message}</span>
                  )}
                </>
              )}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 mt-4">
          <div className="col-span-1 flex flex-col">
            <label
              htmlFor=""
              className="font-semibold text-gray-700">
              Phone number <span className="text-red-600">*</span>
            </label>
            <Controller
              name="phoneNumber"
              control={control}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <TextFieldV2
                  error={error}
                  onChange={onChange}
                  value={value}
                />
              )}
            />
          </div>

          <div className="col-span-1 flex flex-col">
            <label
              htmlFor=""
              className="font-semibold text-gray-700">
              Email <span className="text-red-600">*</span>
            </label>
            <Controller
              name="email"
              control={control}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <TextFieldV2
                  error={error}
                  onChange={onChange}
                  value={value}
                  disabled
                />
              )}
            />
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <div className="flex gap-4">
            <Button
              disabled={isLoadingForm}
              loading={isLoadingForm}
              type="submit"
              className="px-2 py-1">
              Save
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Profile
