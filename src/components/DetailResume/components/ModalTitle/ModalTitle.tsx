import { Dialog, Transition } from '@headlessui/react'
import { FC, Fragment } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import TextFieldV2 from '../../../TextFieldV2'
import Button from '../../../Button'
import { useStoreActions, useStoreState } from 'easy-peasy'
import { resumeActionSelector, resumeStateSelector } from '../../../../store'
import { useNavigate } from 'react-router-dom'

interface Props {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const schema = yup.object().shape({
  title: yup.string().required('Title is required!'),
})

const ModalTitle: FC<Props> = ({ open, setOpen }: Props): JSX.Element => {
  const navigate = useNavigate()
  const { resumeData } = useStoreState(resumeStateSelector)
  const { setResumeData } = useStoreActions(resumeActionSelector)
  const defaultValues: any = {
    title: '',
  }
  const { handleSubmit, control } = useForm<any>({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  })

  const onSubmit = async (data: any) => {
    setResumeData({ ...resumeData, title: data.title })
    setOpen(false)
    navigate('/new-cv')
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
                <Dialog.Panel className="relative w-full max-w-[500px] flex flex-col transform  rounded-xl bg-white p-4 text-left align-top shadow-xl transition-all">
                  <div className="flex flex-col gap-2 relative">
                    <h2 className="m-auto text-2xl font-semibold">Enter Resume Title</h2>
                    <p className="text-center text-[15px] text-black">
                      This name will be use to save your resume.
                    </p>
                    <span
                      className="absolute top-0 right-0 text-xl text-gray-500 cursor-pointer"
                      onClick={() => setOpen(false)}>
                      X
                    </span>

                    <div className="gap-4">
                      <form
                        className="flex flex-col mt-6"
                        onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex flex-col">
                          <Controller
                            name="title"
                            control={control}
                            render={({
                              field: { onChange, value },
                              fieldState: { error },
                            }) => (
                              <TextFieldV2
                                error={error}
                                onChange={onChange}
                                value={value}
                                placeholder="eg. Developer"
                              />
                            )}
                          />
                        </div>
                        <div className="flex justify-end mt-8 gap-8">
                          <Button
                            onClick={() => setOpen(false)}
                            typeButton="cancel">
                            Back
                          </Button>
                          <Button>Create</Button>
                        </div>
                      </form>
                    </div>
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

export default ModalTitle
