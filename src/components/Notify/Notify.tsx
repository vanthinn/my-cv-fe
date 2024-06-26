import { FC, Fragment, useEffect } from 'react'
import { Transition } from '@headlessui/react'
import { CheckCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { XMarkIcon } from '@heroicons/react/20/solid'
import { ActionCreator } from 'easy-peasy'
import { INotify } from '../../types/INotify'

export enum TypeStatusNotification {
  'success',
  'error',
  'warning',
}
interface Props {
  notifySetting: INotify
  setNotifySetting: ActionCreator<INotify>
}

const Notify: FC<Props> = ({ notifySetting, setNotifySetting }: Props): JSX.Element => {
  useEffect(() => {
    let countTimeout: any

    if (notifySetting.show) {
      countTimeout = setTimeout(() => {
        setNotifySetting({ ...notifySetting, show: false })
      }, 2000)
    } else {
      clearTimeout(countTimeout)
    }

    return () => {
      clearTimeout(countTimeout)
    }
  }, [notifySetting.show])

  return (
    <>
      {/* Global notification live region, render this permanently at the end of the document */}
      <div
        aria-live="assertive"
        className="z-[999] pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6">
        <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
          <Transition
            show={notifySetting.show}
            as={Fragment}
            enter="transform ease-out duration-300 transition"
            enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-[100px]"
            enterTo="translate-y-0 opacity-100 sm:translate-x-0"
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0">
            <div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    {notifySetting.status == TypeStatusNotification[0] && (
                      <CheckCircleIcon
                        className="h-6 w-6 text-green-400"
                        aria-hidden="true"
                      />
                    )}
                    {notifySetting.status == TypeStatusNotification[1] && (
                      <ExclamationTriangleIcon
                        className="h-6 w-6 text-red-600"
                        aria-hidden="true"
                      />
                    )}
                    {notifySetting.status == TypeStatusNotification[2] && (
                      <ExclamationTriangleIcon
                        className="h-6 w-6 text-yellow-600"
                        aria-hidden="true"
                      />
                    )}
                  </div>
                  <div className="ml-3 w-0 flex-1 pt-0.5">
                    <p className="text-sm font-medium text-gray-900">
                      {notifySetting.message}
                    </p>
                    {/* <p className='mt-1 text-sm text-gray-500'>{props?.content}</p> */}
                  </div>
                  <div className="ml-4 flex flex-shrink-0">
                    <button
                      type="button"
                      className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      onClick={() => {
                        setNotifySetting({ ...notifySetting, show: false })
                      }}>
                      <span className="sr-only">Close</span>
                      <XMarkIcon
                        className="h-5 w-5"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </>
  )
}

export default Notify
