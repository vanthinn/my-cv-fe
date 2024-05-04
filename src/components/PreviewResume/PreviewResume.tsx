import { useStoreActions, useStoreState } from 'easy-peasy'
import { FC } from 'react'
import { resumeActionSelector, resumeStateSelector } from '../../store'
import Template from './Template'
import { HiOutlineSparkles } from 'react-icons/hi'
import {
  AiOutlineCloudDownload,
  AiOutlineFontSize,
  AiOutlineShareAlt,
} from 'react-icons/ai'
import SelectedV2 from '../SelectedV2/SelectedV2'
import Button from '../Button'
import { useNavigate } from 'react-router-dom'

interface Props {}

const color = [
  '#000',
  '#fff',
  '#373D48',
  '#409BF9',
  '#FF851B',
  '#3AC587',
  '#703838',
  '#F5D400',
]

const PreviewResume: FC<Props> = (props): JSX.Element => {
  const navigate = useNavigate()
  const { resumeData } = useStoreState(resumeStateSelector)
  const { setResumeData } = useStoreActions(resumeActionSelector)
  return (
    <div className="p-8 mt-8 grid grid-cols-10 gap-8 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] ">
      <div className="col-span-7 bg-slate-200 flex-1 h-full ">
        <Template />
      </div>

      <div className="col-span-3 ">
        <div className=" px-4 pt-2.5 pb-6 border border-gray-100 min-h-24 rounded-md shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)]">
          <div>
            <div className="flex gap-2 mb-2">
              <Button
                typeButton="black"
                className="text-[14px]">
                Change template
              </Button>
              <Button
                onClick={() => navigate('/edit-resume')}
                typeButton="elevated"
                className="text-[14px]">
                Edit CV
              </Button>
            </div>

            <span className="font-semibold flex items-center gap-1 py-2 border-b border-gray-200">
              Styles <HiOutlineSparkles />
            </span>
            <div className="flex flex-col gap-2 w-full ">
              <div className="mt-2 flex items-center justify-between">
                <span className="flex-shrink-0 mr-4">Font style</span>
                <div className="flex-1">
                  <SelectedV2 />
                </div>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <span className="flex-shrink-0 mr-4">Font size</span>
                <div className="flex-1">
                  <SelectedV2 />
                </div>
              </div>
              <div className="mt-2 flex flex-col  ">
                <span className="flex-shrink-0 mr-4">Color</span>
                <div className="flex-1 flex flex-wrap gap-1 mt-1">
                  {color.map((item, index) => (
                    <span
                      key={index}
                      onClick={() => setResumeData({ ...resumeData, color: item })}
                      className={`h-8 w-8 rounded-full border border-gray-200 hover:cursor-pointer hover:border-gray-500 `}
                      style={{ backgroundColor: item }}></span>
                  ))}
                </div>
              </div>
            </div>

            <span className="font-semibold flex items-center gap-1 py-2 border-b border-gray-200 mt-8">
              Export <AiOutlineShareAlt />
            </span>

            <div className="flex flex-col gap-4">
              <Button className="flex items-center gap-2 justify-center">
                <AiOutlineCloudDownload className="text-xl mr-3" /> Download
              </Button>

              <Button className="flex items-center gap-2 justify-center bg-red-400 border-none hover:bg-red-600">
                <AiOutlineCloudDownload className="text-xl mr-3" /> Share
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PreviewResume
