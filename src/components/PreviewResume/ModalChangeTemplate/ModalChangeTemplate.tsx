import { Dialog, Transition } from '@headlessui/react'
import { FC, Fragment } from 'react'
import Button from '../../Button'
import economic from '../../../assets/images/economic.png'
import basic from '../../../assets/images/bassic.png'
import classics from '../../../assets/images/classics.png'
import { useStoreActions, useStoreState } from 'easy-peasy'
import { resumeActionSelector, resumeStateSelector } from '../../../store'
import { useParams } from 'react-router-dom'

interface Props {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const ModalChangeTemplate: FC<Props> = ({ open, setOpen }: Props): JSX.Element => {
  const { id } = useParams()
  const { resumeData } = useStoreState(resumeStateSelector)
  const { setResumeData, patchResume } = useStoreActions(resumeActionSelector)

  const handleChange = async (template: any) => {
    setResumeData({ ...resumeData, template: template })
    if (id) {
      await patchResume({ id: id, data: { template: template } })
    }
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
                <Dialog.Panel className="relative w-full max-w-[900px] flex flex-col transform  rounded-xl bg-white px-4 py-8 text-left align-top shadow-xl transition-all">
                  <div>
                    <h4 className="text-center font-medium text-3xl">
                      Choose your favourite template
                    </h4>
                    <div className="grid grid-cols-3 gap-12 px-4 mt-8 ">
                      <div
                        className="relative group h-80 rounded-md cursor-pointer hover:bg-gray-100/50 shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)]
          hover:shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] transition-all duration-200">
                        <img
                          className="h-full w-full py-[16px] px-[24px] object-fill shadow-md"
                          src={basic}
                          alt=""
                        />
                        <div className="absolute top-0 left-0 right-0 bottom-0 invisible group-hover:visible flex">
                          <Button
                            onClick={() => {
                              handleChange('basic')
                              setOpen(false)
                            }}
                            className="m-auto translate-y-[18px] group-hover:translate-y-0">
                            USE TEMPLATE
                          </Button>
                        </div>
                      </div>

                      <div
                        className="relative group h-80 rounded-md cursor-pointer hover:bg-gray-100/50 shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)]
          hover:shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] transition-all duration-200">
                        <img
                          className="h-full w-full py-[16px] px-[24px] object-fill shadow-md"
                          src={economic}
                          alt=""
                        />
                        <div className="absolute top-0 left-0 right-0 bottom-0 invisible group-hover:visible flex">
                          <Button
                            onClick={() => {
                              handleChange('economic')
                              setOpen(false)
                            }}
                            className="m-auto translate-y-[18px] group-hover:translate-y-0">
                            USE TEMPLATE
                          </Button>
                        </div>
                      </div>

                      <div
                        className="relative group h-80 rounded-md cursor-pointer hover:bg-gray-100/50 shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)]
          hover:shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] transition-all duration-200">
                        <img
                          className="h-full w-full py-[16px] px-[24px] object-fill shadow-md"
                          src={classics}
                          alt=""
                        />
                        <div className="absolute top-0 left-0 right-0 bottom-0 invisible group-hover:visible flex">
                          <Button
                            onClick={() => {
                              handleChange('classic')
                              setOpen(false)
                            }}
                            className="m-auto translate-y-[18px] group-hover:translate-y-0">
                            USE TEMPLATE
                          </Button>
                        </div>
                      </div>
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

export default ModalChangeTemplate
