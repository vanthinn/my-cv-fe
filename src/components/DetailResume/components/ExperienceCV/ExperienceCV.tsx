import { FC, useEffect, useState } from 'react'
import ButtonNextBack from '../ButtonNextBack/ButtonNextBack'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { IExperience } from '../../../../types/IResume'
import TextFieldV2 from '../../../TextFieldV2'
import DateTimePicker from '../../../DateTimePicker'
import { Checkbox } from '@mui/material'
import {
  HiOutlineCalendar,
  HiOutlineMinusSm,
  HiOutlinePencil,
  HiOutlineTrash,
  HiPlusCircle,
} from 'react-icons/hi'
import { formatDayVN } from '../../../../utils/functions/formatDay'
import { useStoreActions, useStoreState } from 'easy-peasy'
import { resumeActionSelector, resumeStateSelector } from '../../../../store'
import { generateRandomId } from '../../../../utils/functions/ramdom'
import RichTextEditTor from '../../../RichTextEditor'
import { ContentState, EditorState, convertToRaw } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'
import { v4 as uuidv4 } from 'uuid'

interface Props {
  handleBack: () => void
  activeStep: number
  setActiveStep: React.Dispatch<React.SetStateAction<number>>
}

const schema = yup.object().shape({
  position: yup.string().required('Position is required'),
  company: yup.string().required('Company is required'),
  location: yup.string().required('Location is required'),
  state: yup.boolean(),
  startDate: yup
    .string()
    .required('Start date is required')
    .test(
      'is-less-than-end',
      'Start date must be earlier than end date',
      function (value) {
        const { endDate, state } = this.parent
        if (state) return true // Skip validation if state is true
        return value && endDate ? new Date(value) < new Date(endDate) : true
      },
    ),
  endDate: yup
    .string()
    .nullable()
    .when('state', ([state], schema) => {
      return state === false
        ? schema
            .required('End date is required')
            .test(
              'is-greater-than-start',
              'End date must be later than start date',
              function (value) {
                const { startDate } = this.parent
                return startDate && value ? new Date(value) > new Date(startDate) : true
              },
            )
            .test(
              'is-less-than-today',
              'End date must be earlier than today',
              function (value) {
                return value ? new Date(value) < new Date() : true
              },
            )
        : schema
    }),
})

const newDataEmpty: IExperience = {
  id: '',
  position: '',
  company: '',
  location: '',
  startDate: '',
  endDate: '',
  description: '',
  state: false,
}

const ExperienceCV: FC<Props> = ({
  handleBack,
  activeStep,
  setActiveStep,
}: Props): JSX.Element => {
  const { resumeData } = useStoreState(resumeStateSelector)
  const { setResumeData } = useStoreActions(resumeActionSelector)

  const [itemEdit, setItemEdit] = useState<IExperience | undefined>()
  const [editorState, setEditorState] = useState(EditorState.createEmpty())

  const defaultValues: IExperience = {
    id: '',
    position: '',
    company: '',
    location: '',
    startDate: '',
    endDate: '',
    description: '',
    state: false,
  }

  const { handleSubmit, control, reset, setValue, watch, clearErrors } =
    useForm<IExperience>({
      defaultValues: defaultValues,
      resolver: yupResolver(schema) as any,
    })

  const onSubmit = async (data: any) => {
    const experiences = resumeData?.experiences || []
    const index = experiences.findIndex((item: any) => data.id === item.id)
    if (index !== -1) {
      const updatedExperienceCV = [...experiences]
      updatedExperienceCV[index] = data
      setResumeData({ ...resumeData, experiences: updatedExperienceCV })
    } else {
      const newData = {
        ...data,
        id: uuidv4(),
      }
      setResumeData({ ...resumeData, experiences: [...experiences, newData] })
    }
    setItemEdit(undefined)
    reset()
  }

  const handleBackHome = () => {
    reset()
    setItemEdit(undefined)
  }

  const onEditorStateChange = (editorState: EditorState) => {
    setEditorState(editorState)
    if (editorState.getCurrentContent().hasText()) {
      const dataHTML = draftToHtml(convertToRaw(editorState.getCurrentContent()))
      setValue('description', dataHTML)
    } else {
      setValue('description', '')
    }
  }

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDelete = (data: any) => {
    const newData = resumeData?.experiences.filter((item: any) => item !== data)
    setResumeData({ ...resumeData, experiences: newData })
  }

  const endDateValue = watch('endDate')
  const stateValue = watch('state')

  useEffect(() => {
    if (stateValue && endDateValue) {
      clearErrors('endDate')
    }
  }, [stateValue])

  useEffect(() => {
    if (itemEdit) {
      setValue('id', itemEdit.id)
      setValue('position', itemEdit.position)
      setValue('company', itemEdit.company)
      setValue('location', itemEdit.location)
      setValue('startDate', itemEdit.startDate)
      setValue('endDate', itemEdit.endDate)
      setValue('state', itemEdit.state)

      const contentBlock = htmlToDraft(itemEdit?.description || '')
      const { contentBlocks, entityMap } = contentBlock
      const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap)
      const newEditorState = EditorState.createWithContent(contentState)
      setTimeout(() => {
        setEditorState(newEditorState)
      }, 50)
    }
  }, [itemEdit])
  return (
    <>
      {itemEdit ? (
        <form>
          <div className="grid grid-cols-2 gap-8 mt-4">
            <div className="col-span-1 flex flex-col">
              <label
                htmlFor=""
                className="font-semibold text-gray-700">
                Position <span className="text-red-600">*</span>
              </label>
              <Controller
                name="position"
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
                Company <span className="text-red-600">*</span>
              </label>
              <Controller
                name="company"
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

          <div className="grid grid-cols-3 gap-8 mt-4">
            <div className="col-span-2 flex flex-col">
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

          <div className="grid grid-cols-3 gap-8 mt-4">
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
                    disabled={stateValue}
                    error={error}
                    onChange={onChange}
                    value={value}
                  />
                )}
              />
            </div>

            <div className="col-span-1 flex items-center h-full mt-3 ">
              <Controller
                name="state"
                control={control}
                defaultValue={false}
                render={({ field }) => (
                  <Checkbox
                    {...field}
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                  />
                )}
              />
              <span>I'm in this job right now</span>
            </div>
          </div>
          <h6 className="text-base font-semibold mt-4 mb-2">Description</h6>
          <div className="mt-2 ">
            <RichTextEditTor
              editorState={editorState}
              onEditorStateChange={onEditorStateChange}
            />
          </div>

          <ButtonNextBack
            type="save"
            handleBack={handleBackHome}
            activeStep={activeStep}
            handleNext={handleSubmit(onSubmit)}
          />
        </form>
      ) : (
        <div className="flex flex-col mt-8">
          <div className="flex mx-auto flex-col ">
            {resumeData.experiences &&
              resumeData?.experiences.map((item: any, index: number) => (
                <div
                  key={index}
                  className="min-h-12 mb-4 flex justify-between bg-gray-100 cursor-pointer hover:bg-gray-200 transition-all duration-200 w-[600px] px-4 py-2 rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
                  <div>
                    <span className="text-xl font-medium">{item.position}</span>

                    <p className="flex items-center text-sm ">
                      {item.company} <HiOutlineCalendar className="mx-2" />{' '}
                      <span>{formatDayVN(item.startDate)}</span>{' '}
                      <HiOutlineMinusSm className="mx-1 text-sx" />{' '}
                      {!item.state ? <span>{formatDayVN(item.endDate)}</span> : 'now'}
                    </p>
                  </div>
                  <div className="flex gap-4 items-center">
                    <HiOutlinePencil
                      onClick={() => setItemEdit(item)}
                      className="text-xl"
                    />
                    <HiOutlineTrash
                      onClick={() => handleDelete(item)}
                      className="text-xl hover:text-red-600"
                    />
                  </div>
                </div>
              ))}
          </div>
          <div className="flex mx-auto ">
            <div
              onClick={() => setItemEdit(newDataEmpty)}
              className="min-h-12  border border-blue-400 border-dashed cursor-pointer  w-[600px] flex  items-center px-4 py-4 ">
              <div className="font-semibold text-blue-500 flex items-center gap-2">
                <HiPlusCircle className="text-2xl" /> Add Another
              </div>
            </div>
          </div>
          <ButtonNextBack
            handleBack={handleBack}
            activeStep={activeStep}
            handleNext={handleNext}
          />
        </div>
      )}
    </>
  )
}

export default ExperienceCV
