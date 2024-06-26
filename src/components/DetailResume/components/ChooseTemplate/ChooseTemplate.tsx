import { FC } from 'react'
import Button from '../../../Button'
import basic from '../../../../assets/images/bassic.png'
import economic from '../../../../assets/images/economic.png'
import classic from '../../../../assets/images/classics.png'

interface Props {
  setTemplate: (template: string) => void
}

const ChooseTemplate: FC<Props> = ({ setTemplate }: Props): JSX.Element => {
  return (
    <>
      <h4 className="text-center font-medium text-3xl">Choose your favourite template</h4>
      <div className="grid grid-cols-3 gap-12 px-4 mt-8 ">
        <div
          className="relative group h-80 rounded-md cursor-pointer hover:bg-gray-100/50 shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)]
          hover:shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] transition-all duration-200">
          <img
            className="h-full w-full  shadow-md py-[16px] px-[24px] object-fill"
            src={basic}
            alt=""
          />
          <div className="absolute top-0 left-0 right-0 bottom-0 invisible group-hover:visible flex">
            <Button
              onClick={() => setTemplate('basic')}
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
              onClick={() => setTemplate('economic')}
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
            src={classic}
            alt=""
          />
          <div className="absolute top-0 left-0 right-0 bottom-0 invisible group-hover:visible flex">
            <Button
              onClick={() => setTemplate('classic')}
              className="m-auto translate-y-[18px] group-hover:translate-y-0">
              USE TEMPLATE
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default ChooseTemplate
