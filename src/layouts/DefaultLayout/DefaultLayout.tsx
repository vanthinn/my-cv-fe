import { FC } from 'react'
import Header from '../components/Header/Header'
import Footer from '../components/Footer'

interface Props {
  children: React.ReactNode
}

const DefaultLayout: FC<Props> = ({ children }): JSX.Element => {
  return (
    <div className=" min-h-screen wrapper overflow-x-hidden flex flex-col bg-white xl:mx-24 ">
      <Header />
      <div className="grid grid-cols-12 flex-1">
        <main className="mt-[60px] flex flex-col relative">{children}</main>
      </div>
      <Footer />
    </div>
  )
}

export default DefaultLayout
