import { FC } from 'react'

interface Props {}

const Footer: FC<Props> = (props): JSX.Element => {
  return (
    <div className="py-3 bg-gradient-to-r from-gray-100 to-sky-100 flex justify-center text-[13px]  ">
      <span className="from-purple-600 via-pink-600 to-blue-600 bg-gradient-to-r bg-clip-text text-transparent">
        © 2024 Jobs & CV, email: thinh209202@gmail.com
      </span>
    </div>
  )
}

export default Footer
