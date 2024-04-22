import { FC } from 'react'
import Header from '../components/Header/Header'
import Footer from '../components/Footer'
import { Container } from '../Container/Container'

interface Props {
  children: React.ReactNode
}

const DefaultLayout: FC<Props> = ({ children }): JSX.Element => {
  return (
    <div className=" min-h-screen wrapper overflow-x-hidden flex flex-col bg-white ">
      <Header />
      <div className="flex-1">
        <Container>
          <main className="mt-24 flex flex-col relative">{children}</main>
        </Container>
      </div>
      <Footer />
    </div>
  )
}

export default DefaultLayout
