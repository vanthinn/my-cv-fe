import { FC } from 'react'
import ButtonNextBack from '../ButtonNextBack/ButtonNextBack'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { IEducation } from '../../../../types/IResume'
import TextFieldV2 from '../../../TextFieldV2'
import Selected from '../../../Select'
import { stateEducation } from '../../../../common/constants'
import DateTimePicker from '../../../DateTimePicker'
import { useStoreActions, useStoreState } from 'easy-peasy'
import { resumeActionSelector, resumeStateSelector } from '../../../../store'

interface Props {
  handleBack: () => void
  activeStep: number
  setActiveStep: React.Dispatch<React.SetStateAction<number>>
}

const schema = yup.object().shape({
  schoolName: yup.string().required('SchoolName is required'),
  location: yup.string().required('Location is required'),
  fieldOfStudy: yup.string().required('Field of study is required'),
  state: yup.string().required('State is required'),
  startDate: yup
    .string()
    .required('Start date is required')
    .test(
      'is-less-than-end',
      'Start date must be earlier than end date',
      function (value) {
        const { endDate } = this.parent
        return value && endDate ? new Date(value) < new Date(endDate) : true
      },
    ),
  endDate: yup
    .string()
    .required('End date is required')
    .test(
      'is-greater-than-start',
      'End date must be later than start date',
      function (value) {
        const { startDate } = this.parent
        return startDate && value ? new Date(value) > new Date(startDate) : true
      },
    ),
  GPA: yup
    .number()
    .nullable()
    .max(4, 'GPA must be 4 or less')
    .typeError('GPA must be a number'),
})

const EducationCV: FC<Props> = ({
  handleBack,
  activeStep,
  setActiveStep,
}): JSX.Element => {
  const { resumeData } = useStoreState(resumeStateSelector)
  const { setResumeData } = useStoreActions(resumeActionSelector)

  const defaultValues: IEducation = {
    id: resumeData?.education?.id || '',
    schoolName: resumeData?.education?.schoolName || '',
    location: resumeData?.education?.location || '',
    fieldOfStudy: resumeData?.education?.fieldOfStudy || '',
    state: resumeData?.education?.state || '',
    GPA: resumeData?.education?.GPA || null,
    startDate: resumeData?.education?.startDate || '',
    endDate: resumeData?.education?.endDate || '',
  }
  const { handleSubmit, control } = useForm<IEducation>({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  })

  const onSubmit = async (data: any) => {
    setResumeData({ ...resumeData, education: data })
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-2 gap-8 mt-4">
        <div className="col-span-1 flex flex-col">
          <label
            htmlFor=""
            className="font-semibold text-gray-700">
            Name of school <span className="text-red-600">*</span>
          </label>
          <Controller
            name="schoolName"
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
            Field of study <span className="text-red-600">*</span>
          </label>
          <Controller
            name="fieldOfStudy"
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
        <div className="grid grid-cols-2 gap-8">
          <div className="col-span-1 flex flex-col">
            <label
              htmlFor=""
              className="font-semibold text-gray-700">
              GPA
            </label>
            <Controller
              name="GPA"
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
              State <span className="text-red-600">*</span>
            </label>
            <Controller
              name="state"
              control={control}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <Selected
                  error={error}
                  onChange={onChange}
                  value={value}
                  options={stateEducation}
                  empty="Select state"
                />
              )}
            />
          </div>
        </div>
        <div className="col-span-1 flex flex-col">
          <label
            htmlFor=""
            className="font-semibold text-gray-700">
            Location <span className="text-red-600">*</span>
          </label>
          <Controller
            name="location"
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
        <div className="col-span-1 flex flex-col ">
          <label
            htmlFor=""
            className="font-semibold text-gray-700">
            Start Date <span className="text-red-600">*</span>
          </label>
          <Controller
            name="startDate"
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

        <div className="col-span-1 flex flex-col ">
          <label
            htmlFor=""
            className="font-semibold text-gray-700">
            End Date <span className="text-red-600">*</span>
          </label>
          <Controller
            name="endDate"
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
      </div>

      <ButtonNextBack
        handleBack={handleBack}
        activeStep={activeStep}
        handleNext={handleSubmit(onSubmit)}
      />
    </form>
  )
}

export default EducationCV
