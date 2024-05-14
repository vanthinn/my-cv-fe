import { FC } from 'react'
import HeaderEmployer from '../components/HeaderEmployer'
import SidebarEmployer from '../components/SidebarEmployer/SidebarEmployer'

interface Props {
  children: React.ReactNode
}

const LayoutEmployer: FC<Props> = ({ children }: Props): JSX.Element => {
  return (
    <div className=" min-h-screen wrapper overflow-x-hidden flex flex-col bg-white ">
      <HeaderEmployer />
      <div className="flex-1 grid grid-cols-12 mt-16">
        <nav className="col-span-2 flex flex-col  ">
          <SidebarEmployer />
        </nav>
        <main className=" flex flex-col col-span-10 relative p-3 bg-slate-300   ">
          {children}
        </main>
      </div>
    </div>
  )
}

export default LayoutEmployer
