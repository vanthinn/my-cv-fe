import { FC, Fragment, useEffect, useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Controller, useForm } from 'react-hook-form'
import { IRecruitmentRequest } from '../../../../types/IRecruitment'
import { ContentState, EditorState, convertToRaw } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import { Dialog, Transition } from '@headlessui/react'
import TextFieldV2 from '../../../../components/TextFieldV2'
import Selected from '../../../../components/Select'
import DateTimePicker from '../../../../components/DateTimePicker'
import RichTextEditTor from '../../../../components/RichTextEditor'
import Button from '../../../../components/Button'
import { HiPlus, HiX } from 'react-icons/hi'
import { educationData, experienceAdd, jobTypeData } from '../../../../common/constants'
import htmlToDraft from 'html-to-draftjs'

interface Props {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  handleAction: (data: any) => Promise<void>
  data: any
}

const schema = yup.object().shape({
  jobTitle: yup.string().required('Job title is required'),
  salary: yup.string().required('Salary is required'),
  deadline: yup.string().required('Deadline is required'),
  description: yup.string().required('Description is required'),
  jobType: yup.string().required('Job type is required'),
  experience: yup.string().required('Experience is required'),
})

const ModalAddEditJob: FC<Props> = ({
  open,
  setOpen,
  handleAction,
  data,
}: Props): JSX.Element => {
  const defaultValues: IRecruitmentRequest = {
    id: data?.id || '',
    deadline: data?.deadline || '',
    description: data?.description || '',
    jobType: data?.jobType || '',
    experience: data?.experience || '',
    jobTitle: data?.jobTitle || '',
    salary: data?.salary || '',
    education: data?.education || '',
    skills: data?.skills || [],
    workTime: data?.workTime || '',
  }

  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  const [inputSkills, setInputSkills] = useState<string>('')
  const [skillsArray, setSkillsArray] = useState<string[]>(data?.skills || [])

  const { handleSubmit, control, setValue, clearErrors } = useForm<IRecruitmentRequest>({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  })

  const handleChangeInputSkill = (value: any): void => {
    setInputSkills(value.target.value)
  }

  const handleDelete = (item: string) => {
    const newData = skillsArray.filter((skill: any) => skill !== item)
    setSkillsArray(newData)
    setValue('skills', newData)
  }

  const onEditorStateChange = (editorState: EditorState) => {
    setEditorState(editorState)
    if (editorState.getCurrentContent().hasText()) {
      clearErrors('description')
      const dataHTML = draftToHtml(convertToRaw(editorState.getCurrentContent()))
      setValue('description', dataHTML)
    } else {
      setValue('description', '')
    }
  }

  const onSubmit = async (data: any) => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    const dataHTML = draftToHtml(convertToRaw(editorState.getCurrentContent()))
    handleAction({ ...data, description: dataHTML })
  }

  useEffect(() => {
    if (data) {
      clearErrors('description')
      const contentBlock = htmlToDraft(data.description)
      const { contentBlocks, entityMap } = contentBlock
      const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap)
      const newEditorState = EditorState.createWithContent(contentState)
      setTimeout(() => {
        setEditorState(newEditorState)
      }, 50)
    }
  }, [data])

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
                    <h2 className="m-auto text-xl font-semibold">Add new job</h2>
                    <span
                      className="absolute top-0 right-0 text-xl text-gray-500 cursor-pointer"
                      onClick={() => setOpen(false)}>
                      X
                    </span>
                  </div>
                  <div className="mt-2.5">
                    <form
                      className="mt-4 flex-1"
                      onSubmit={handleSubmit(onSubmit)}>
                      <div className="grid grid-cols-1 gap-4 flex-1">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="col-span-1 flex flex-col">
                            <label
                              htmlFor=""
                              className="font-semibold text-gray-700">
                              Job title <span className="text-red-600">*</span>
                            </label>
                            <Controller
                              name="jobTitle"
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
                              Experience <span className="text-red-600">*</span>
                            </label>
                            <Controller
                              name="experience"
                              control={control}
                              render={({
                                field: { onChange, value },
                                fieldState: { error },
                              }) => (
                                <Selected
                                  error={error}
                                  onChange={onChange}
                                  value={value}
                                  options={experienceAdd}
                                  empty="Select experience"
                                />
                              )}
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="col-span-1 flex flex-col ">
                            <label
                              htmlFor=""
                              className="font-semibold text-gray-700">
                              Salary <span className="text-red-600">*</span>
                            </label>
                            <Controller
                              name="salary"
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
                              Education
                            </label>
                            <Controller
                              name="education"
                              control={control}
                              render={({
                                field: { onChange, value },
                                fieldState: { error },
                              }) => (
                                <Selected
                                  error={error}
                                  onChange={onChange}
                                  value={value || ''}
                                  options={educationData}
                                  empty="Select education"
                                />
                              )}
                            />
                          </div>
                          <div className="col-span-1 flex flex-col">
                            <label
                              htmlFor=""
                              className="font-semibold text-gray-700">
                              Job type <span className="text-red-600">*</span>
                            </label>
                            <Controller
                              name="jobType"
                              control={control}
                              render={({
                                field: { onChange, value },
                                fieldState: { error },
                              }) => (
                                <Selected
                                  error={error}
                                  onChange={onChange}
                                  value={value}
                                  options={jobTypeData}
                                  empty="Select job type"
                                />
                              )}
                            />
                          </div>
                          <div className="col-span-1 flex flex-col">
                            <label
                              htmlFor=""
                              className="font-semibold text-gray-700">
                              Deadline <span className="text-red-600">*</span>
                            </label>
                            <Controller
                              name="deadline"
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
                        </div>
                      </div>

                      <div>
                        <h6 className="text-base font-semibold mt-4 mb-2">SKills</h6>
                        <div className="flex gap-4">
                          <TextFieldV2
                            onChange={handleChangeInputSkill}
                            value={inputSkills}
                            placeholder="eg. HTML/CSS"
                            width="400px"
                          />

                          <Button
                            disabled={inputSkills === ''}
                            onClick={() => {
                              setInputSkills('')
                              const newData = [...skillsArray, inputSkills]
                              setSkillsArray(newData)
                              setValue('skills', newData)
                            }}>
                            <HiPlus className="text-xl mr-2" /> Add
                          </Button>
                        </div>
                      </div>
                      <div className="mt-4 flex flex-wrap gap-4">
                        {skillsArray.length > 0 &&
                          skillsArray.map((item: any, index: number) => (
                            <span
                              className="px-3 py-1.5 text-sm text-white bg-blue-600 list-none rounded-full flex items-center "
                              key={index}>
                              {item}{' '}
                              <HiX
                                onClick={() => handleDelete(item)}
                                className="text-lg ml-3 cursor-pointer"
                              />
                            </span>
                          ))}
                      </div>

                      <div className="mt-4">
                        <label
                          htmlFor=""
                          className="font-semibold text-gray-700">
                          Description <span className="text-red-600">*</span>
                        </label>

                        <Controller
                          name="description"
                          control={control}
                          render={({ field: {}, fieldState: { error } }) => (
                            <RichTextEditTor
                              editorState={editorState}
                              onEditorStateChange={onEditorStateChange}
                              error={error}
                            />
                          )}
                        />
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

export default ModalAddEditJob
