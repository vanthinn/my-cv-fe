import { FC } from 'react'

interface Props {}

const HomeEmployer: FC<Props> = (props): JSX.Element => {
  return (
    <div className="p-4 bg-white rounded-md flex-1 flex flex-col shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]">
      <h4 className="font-semibold text-xl">Dashboard</h4>
    </div>
  )
}

export default HomeEmployer
