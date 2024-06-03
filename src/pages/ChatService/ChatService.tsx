import { FC } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import SidebarMessage from '../../layouts/SidebarMessage'
import { IoChatbubblesOutline } from 'react-icons/io5'

interface Props {}

const ChatService: FC<Props> = (): JSX.Element => {
  const { id } = useParams()
  return (
    <div className="p-4 bg-white rounded-md flex-1 flex flex-col shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]">
      <div className="grid grid-cols-12 flex-1 border-r border-t border-b border-gray-300">
        <div className="col-span-3 flex-1 border-l border-r border-gray-300">
          <SidebarMessage />
        </div>
        <div className="col-span-9 flex-1 ">
          {id === undefined ? (
            <div className="text-xl font-bold flex flex-col gap-3 h-full">
              <div className="m-auto flex flex-col items-center">
                <IoChatbubblesOutline className="h-16 w-16 text-[#0001CB] text-center" />
                <span>There is no chat selected yet</span>
              </div>
            </div>
          ) : (
            <Outlet />
          )}
        </div>
      </div>
    </div>
  )
}

export default ChatService
