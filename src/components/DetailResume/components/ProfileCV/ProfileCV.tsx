import { FC, useEffect, useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import ButtonNextBack from '../ButtonNextBack/ButtonNextBack'
import { IProfileCV } from '../../../../types/IResume'
import TextFieldV2 from '../../../TextFieldV2'
import Selected from '../../../Select'
import { IOption, Image } from '../../../../types/ICommon'
import { Gender } from '../../../../common/enum'
import DateTimePicker from '../../../DateTimePicker'
import MultiImage from '../../../MultiImage'
import { useStoreActions, useStoreState } from 'easy-peasy'
import {
  resumeActionSelector,
  resumeStateSelector,
  userActionSelector,
  userStateSelector,
} from '../../../../store'

interface Props {
  handleBack: () => void
  activeStep: number
  setActiveStep: React.Dispatch<React.SetStateAction<number>>
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
  firstName: yup.string().required('FirstName is required'),
  lastName: yup.string().required('LastName is required'),
  avatarUrl: yup.string().required('AvatarUrl is required'),
  dateOfBirth: yup.string().required('Date of birth is required'),
  phoneNumber: yup.string().required('Phone number is required'),
  email: yup.string().required('Email is required'),
  gender: yup.string().required('Gender is required'),
})

const ProfileCV: FC<Props> = ({
  handleBack,
  activeStep,
  setActiveStep,
}: Props): JSX.Element => {
  const { currentUserSuccess } = useStoreState(userStateSelector)
  const { postImage } = useStoreActions(userActionSelector)
  const { resumeData } = useStoreState(resumeStateSelector)
  const { setResumeData } = useStoreActions(resumeActionSelector)
  const ImageRef: any = useRef()
  const [Images, setImages] = useState<Image[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const defaultValues: IProfileCV = {
    id: resumeData?.profile?.id || '',
    firstName: resumeData?.profile?.firstName || currentUserSuccess?.firstName || '',
    lastName: resumeData?.profile?.lastName || currentUserSuccess?.lastName || '',
    avatarUrl: resumeData?.profile?.avatarUrl || '',
    dateOfBirth:
      resumeData?.profile?.dateOfBirth  || currentUserSuccess?.dateOfBirth || '',
    phoneNumber:
      resumeData?.profile?.phoneNumber || currentUserSuccess?.phoneNumber || '',
    email: resumeData?.profile?.email || currentUserSuccess?.email || '',
    gender: resumeData?.profile?.gender || currentUserSuccess?.gender || '',
    address: resumeData?.profile?.address || currentUserSuccess?.address || '',
    facebook: resumeData?.profile?.facebook || '',
    linkedin: resumeData?.profile?.linkedin || '',
  }

  const { handleSubmit, control, setValue, watch, clearErrors } = useForm<IProfileCV>({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  })

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
    setResumeData({ ...resumeData, profile: data })
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const valueAvatarUrl = watch('avatarUrl')

  useEffect(() => {
    if (valueAvatarUrl !== '') {
      clearErrors('avatarUrl')
    }
  }, [valueAvatarUrl])

  useEffect(() => {
    if (resumeData.profile) {
      const imagePreview: Image[] = [
        {
          name: resumeData?.profile.lastName || '',
          fileUrl: resumeData?.profile.avatarUrl || '',
        },
      ]
      setImages(imagePreview)
    }
  }, [])

  return (
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
                {error && <span className="text-red-600 text-sm">{error?.message}</span>}
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
              />
            )}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8 mt-4">
        <div className="col-span-1 flex flex-col">
          <label
            htmlFor=""
            className="font-semibold text-gray-700">
            Facebook
          </label>
          <Controller
            name="facebook"
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
            Linkedin
          </label>
          <Controller
            name="linkedin"
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

      <ButtonNextBack
        handleBack={handleBack}
        activeStep={activeStep}
        handleNext={handleSubmit(onSubmit)}
      />
    </form>
  )
}

export default ProfileCV
