import React, { FC, useEffect, useRef, useState } from 'react'
import ButtonNextBack from '../ButtonNextBack/ButtonNextBack'
import Button from '../../../Button'
import TextFieldV2 from '../../../TextFieldV2'
import { HiOutlineTrash, HiPlus, HiX } from 'react-icons/hi'
import RichTextEditTor from '../../../RichTextEditor'
import { EditorState, convertToRaw, ContentState } from 'draft-js'
// import htmlToDraft from 'html-to-draftjs'
import draftToHtml from 'draftjs-to-html'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import DateTimePicker from '../../../DateTimePicker'
import { useStoreActions, useStoreState } from 'easy-peasy'
import {
  notifyActionSelector,
  resumeActionSelector,
  resumeStateSelector,
} from '../../../../store'
import htmlToDraft from 'html-to-draftjs'
import { useNavigate, useParams } from 'react-router-dom'

interface Props {
  handleBack: () => void
  activeStep: number
  setActiveStep: React.Dispatch<React.SetStateAction<number>>
}

const schema = yup.object().shape({
  certificates: yup.array().of(
    yup.object().shape({
      id: yup.string(),
      displayName: yup.string().required('Certification is required'),
      date: yup.string().required('date is required'),
    }),
  ),
})

const Objective: FC<Props> = ({ handleBack, activeStep }: Props): JSX.Element => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { resumeData, isCreateResumeSuccess, messageErrorResume, isUpdateCVSuccess } =
    useStoreState(resumeStateSelector)
  const {
    setResumeData,
    createResume,
    setIsCreateResumeSuccess,
    updateCV,
    setIsUpdateCVByIdSuccess,
  } = useStoreActions(resumeActionSelector)
  const { setNotifySetting } = useStoreActions(notifyActionSelector)
  const interests = resumeData?.interests || []
  const certificationsDefault = resumeData?.certificates || [
    { id: '', displayName: '', date: '' },
  ]
  const summary = resumeData?.summary
  const formRef = useRef<HTMLFormElement>(null)
  const [inputHobbies, setInputHobbies] = useState<string>('')
  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  const [isLoading, setIsLoading] = useState(false)

  const onEditorStateChange = (editorState: EditorState) => {
    setEditorState(editorState)
  }

  const handleChangeInputHobbies = (value: any): void => {
    setInputHobbies(value.target.value)
  }

  const handleDelete = (item: string) => {
    const newData = interests.filter((interest: any) => interest !== item)
    setResumeData({ ...resumeData, interests: newData })
  }

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      certificates: certificationsDefault,
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'certificates',
  })

  const onSubmit = async (data: any) => {
    const dataHTML = draftToHtml(convertToRaw(editorState.getCurrentContent()))
    setIsLoading(true)
    if (id) {
      const res = await updateCV({
        ...resumeData,
        certificates: data.certificates,
        summary: dataHTML,
      })
      if (res) {
        setResumeData({
          ...resumeData,
          id: res.id,
          certificates: data.certificates,
          summary: dataHTML,
        })
        setNotifySetting({
          show: true,
          status: 'success',
          message: 'Update CV successful',
        })
        navigate('/preview-cv/' + id)
      }
    } else {
      const res = await createResume({
        ...resumeData,
        certificates: data.certificates,
        summary: dataHTML,
      })
      if (res) {
        setResumeData({
          ...resumeData,
          id: res.id,
          certificates: data.certificates,
          summary: dataHTML,
        })
        setNotifySetting({
          show: true,
          status: 'success',
          message: 'Create CV successful',
        })
        navigate('/preview-cv/' + res.id)
      }
    }
    setIsLoading(false)
  }

  const handleNext = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault()
    if (formRef.current) {
      formRef.current.dispatchEvent(
        new Event('submit', { cancelable: true, bubbles: true }),
      )
    }
  }

  useEffect(() => {
    if (!isCreateResumeSuccess) {
      setNotifySetting({
        show: true,
        status: 'error',
        message: messageErrorResume,
      })
      setIsCreateResumeSuccess(true)
    }
  }, [isCreateResumeSuccess])

  useEffect(() => {
    if (!isUpdateCVSuccess) {
      setNotifySetting({
        show: true,
        status: 'error',
        message: messageErrorResume,
      })
      setIsUpdateCVByIdSuccess(true)
    }
  }, [isUpdateCVSuccess])

  useEffect(() => {
    if (summary) {
      const contentBlock = htmlToDraft(summary)
      const { contentBlocks, entityMap } = contentBlock
      const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap)
      const newEditorState = EditorState.createWithContent(contentState)
      setTimeout(() => {
        setEditorState(newEditorState)
      }, 50)
    }
  }, [summary])

  return (
    <div className="mt-4">
      <div>
        <h4 className="font-medium text-xl">Hobbies / Interests</h4>
        <p className="text-sm text-gray-400 mt-2">
          Showcase your Interests to an employer
        </p>
        <h6 className="text-base font-semibold mt-4 mb-2">Interests</h6>
        <div className="flex gap-4">
          <TextFieldV2
            onChange={handleChangeInputHobbies}
            value={inputHobbies}
            placeholder="eg. Football, play games"
            width="400px"
          />

          <Button
            disabled={inputHobbies === ''}
            onClick={() => {
              setResumeData({ ...resumeData, interests: [...interests, inputHobbies] })
              setInputHobbies('')
            }}>
            <HiPlus className="text-xl mr-2" /> Add
          </Button>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-4">
        {interests.length > 0 &&
          interests.map((item: any, index: number) => (
            <span
              className="text-base px-4 py-2 text-white bg-blue-600 list-none rounded-full flex items-center "
              key={index}>
              {item}{' '}
              <HiX
                onClick={() => handleDelete(item)}
                className="text-lg ml-3 cursor-pointer"
              />
            </span>
          ))}
      </div>

      <h4 className="font-medium text-xl mt-6 mb-4">
        Have you done any courses or got any certificates? (Optional)
      </h4>
      <form
        ref={formRef}
        onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {fields.map((field, index) => (
            <React.Fragment key={field.id}>
              <div className="flex flex-col ">
                <label
                  htmlFor={`certificates[${index}].certificate`}
                  className="font-semibold text-gray-700 mb-1">
                  Certification
                </label>
                <Controller
                  name={
                    `certificates[${index}].displayName` as `certificates.${number}.displayName`
                  }
                  control={control}
                  defaultValue=""
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
                  Date
                </label>
                <Controller
                  name={`certificates[${index}].date` as `certificates.${number}.date`}
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

              <HiOutlineTrash
                className="text-3xl mt-9  cursor-pointer hover:text-red-500"
                onClick={() => remove(index)}
              />
            </React.Fragment>
          ))}
        </div>
        <Button
          type="button"
          className="mt-6"
          onClick={() => append({ displayName: '', date: '' })}>
          <HiPlus className="text-xl mr-2" /> Add another
        </Button>
      </form>

      <div className="mt-8">
        <h4 className="font-medium text-xl">Now, let's work on your resume objective</h4>
        <p className="text-sm text-gray-400 mt-2">
          This appears near the top of your resume. Impress employers with a strong
          opening statement that sums up your strengths and experience.
        </p>
        <h6 className="text-base font-semibold mt-4 mb-2">Summary</h6>
        <div className="mt-2 ">
          <RichTextEditTor
            editorState={editorState}
            onEditorStateChange={onEditorStateChange}
          />
        </div>
      </div>
      <ButtonNextBack
        handleBack={handleBack}
        activeStep={activeStep}
        handleNext={handleNext}
        isLoading={isLoading}
      />
    </div>
  )
}

export default Objective
