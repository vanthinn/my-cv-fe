import { Dialog, Transition } from '@headlessui/react'
import { FC, Fragment } from 'react'

interface Props {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  image: string
}

const ModalShowImageCV: FC<Props> = ({ setOpen, open, image }): JSX.Element => {
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
                <Dialog.Panel className="relative w-full max-w-[750px] max-h-[660px] overflow-y-auto flex flex-col transform  rounded-xl bg-white p-4 text-left align-middle shadow-xl transition-all">
                  <div className="h-auto w-full">
                    <img
                      src={image}
                      alt=""
                    />
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

export default ModalShowImageCV
