import { Dialog, Transition } from '@headlessui/react'
import { FC, Fragment, useEffect, useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { IOption, Image } from '../../types/ICommon'
import { Gender } from '../../common/enum'
import { useStoreActions, useStoreState } from 'easy-peasy'
import { notifyActionSelector, userActionSelector, userStateSelector } from '../../store'
import { IUserEdit } from '../../types/IUser'
import TextFieldV2 from '../TextFieldV2'
import MultiImage from '../MultiImage'
import DateTimePicker from '../DateTimePicker'
import Selected from '../Select'
import Button from '../Button'

interface Props {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

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
  firstName: yup.string().required('Email is required'),
  lastName: yup.string().required('AvatarUrl is required'),
  dateOfBirth: yup.string().required('AvatarUrl is required'),
  phoneNumber: yup.string().required('AvatarUrl is required'),
  email: yup.string().required('AvatarUrl is required'),
  gender: yup.string().required('AvatarUrl is required'),
})

const ModalEditProfile: FC<Props> = ({ open, setOpen }: Props): JSX.Element => {
  const { currentUserSuccess, messageErrorUser, isEditUserSuccess } =
    useStoreState(userStateSelector)
  const { postImage, editEdit, setIsEditUserSuccess, setCurrentUserSuccess } =
    useStoreActions(userActionSelector)
  const { setNotifySetting } = useStoreActions(notifyActionSelector)
  const ImageRef: any = useRef()
  const [Images, setImages] = useState<Image[]>([])
  const [isLoadingImage, setIsLoadingImage] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const defaultValues: IUserEdit = {
    id: currentUserSuccess?.id || '',
    firstName: currentUserSuccess?.firstName || '',
    lastName: currentUserSuccess?.lastName || '',
    avatarUrl: currentUserSuccess?.avatarUrl || '',
    phoneNumber: currentUserSuccess?.phoneNumber || '',
    email: currentUserSuccess?.email || '',
    gender: currentUserSuccess?.gender || '',
    dateOfBirth: currentUserSuccess?.dateOfBirth || '',
    address: currentUserSuccess?.address || '',
  }

  const { handleSubmit, control, setValue } = useForm<IUserEdit>({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  })

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
    setIsLoadingImage(true)
    const formData = new FormData()
    formData.append(`documents`, file[0])
    const resImage = await postImage(formData)
    if (resImage) {
      setValue('avatarUrl', resImage[0].fileUrl)
    }
    setIsLoadingImage(false)
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
    setIsLoading(true)
    const res = await editEdit(data)
    if (res.status === 200) {
      setNotifySetting({
        show: true,
        status: 'success',
        message: 'Edit user successfully',
      })
      setCurrentUserSuccess(res.data)
    }
    setOpen(false)
    setIsLoading(false)
  }

  return (
    <div>
      <Transition
        appear
        show={open}
        as={Fragment}>
        <Dialog
          as="div"
          className="relative z-[999]"
          onClose={() => setOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0">
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95">
                <Dialog.Panel className="relative w-full max-w-[700px] max-h-[600px]  overflow-y-auto overflow-hidden flex flex-col transform  rounded-xl bg-white p-4 text-left align-middle shadow-xl transition-all">
                  <div className="flex flex-col gap-2 relative">
                    <h2 className="m-auto text-xl font-semibold">Edit profile</h2>
                    <span
                      className="absolute top-0 right-0 text-xl text-gray-500 cursor-pointer"
                      onClick={() => setOpen(false)}>
                      X
                    </span>
                  </div>
                  <div className="mt-2.5">
                    <form
                      className="mt-4"
                      onSubmit={handleSubmit(onSubmit)}>
                      <div className="grid grid-cols-3 gap-8">
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
                                render={({
                                  field: { onChange, value },
                                  fieldState: { error },
                                }) => (
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
                                render={({
                                  field: { onChange, value },
                                  fieldState: { error },
                                }) => (
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
                                render={({
                                  field: { onChange, value },
                                  fieldState: { error },
                                }) => (
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
                                render={({
                                  field: { onChange, value },
                                  fieldState: { error },
                                }) => (
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
                                render={({
                                  field: { onChange, value },
                                  fieldState: { error },
                                }) => (
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
                                  loading={isLoadingImage}
                                />
                                {error && (
                                  <span className="text-red-600 text-sm">
                                    {error?.message}
                                  </span>
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
                            render={({
                              field: { onChange, value },
                              fieldState: { error },
                            }) => (
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
                            render={({
                              field: { onChange, value },
                              fieldState: { error },
                            }) => (
                              <TextFieldV2
                                error={error}
                                onChange={onChange}
                                value={value}
                              />
                            )}
                          />
                        </div>
                      </div>
                      <div className="mt-6 flex justify-end">
                        <div className="flex gap-4">
                          <Button
                            typeButton="cancel"
                            onClick={(e) => {
                              e.preventDefault()
                              setOpen(false)
                            }}
                            className="px-2 py-1">
                            Cancel
                          </Button>
                          <Button
                            type="submit"
                            disabled={isLoading}
                            loading={isLoading}
                            className="px-2 py-1">
                            Save
                          </Button>
                        </div>
                      </div>
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  )
}

export default ModalEditProfile
