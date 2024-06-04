import { FC } from 'react'
import SidebarMessage from '../SidebarMessage'
import Header from '../components/Header/Header'

interface Props {
  children: React.ReactNode
}

const MessageLayout: FC<Props> = ({ children }): JSX.Element => {
  return (
    <div className=" min-h-screen wrapper overflow-x-hidden flex flex-col">
      <Header />
      <div className="mt-24 xl:mx-60 lg:mx-16 sx:mx-8 xs:mx-auto flex flex-col flex-1 ">
        <div className="grid grid-cols-10 flex-1 h-full border-t border-b rounded-xl overflow-hidden border-r border-gray-300 my-8 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] ">
          <nav className="col-span-3 flex-1 border-l border-r border-gray-300 h-full">
            <SidebarMessage />
          </nav>
          <main className="col-span-7 bg-slate-200 flex flex-col flex-1 h-full">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}

export default MessageLayout
