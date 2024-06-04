import { useStoreState } from 'easy-peasy'
import { FC } from 'react'
import { resumeStateSelector } from '../../../store'
import BasicTemplate from './BasicTemplate'
import EconomicTemplate from './Economic'
import ClassicTemplate from './ClassicTemplate/ClassicTemplate'

interface Props {}

const Template: FC<Props> = (): JSX.Element => {
  const { resumeData } = useStoreState(resumeStateSelector)
  const template = resumeData.template

  console.log(resumeData)

  let templateUI: JSX.Element
  switch (template) {
    case 'economic':
      templateUI = <EconomicTemplate resumeData={resumeData} />
      break
    case 'basic':
      templateUI = <BasicTemplate resumeData={resumeData} />
      break
    case 'classic':
      templateUI = <ClassicTemplate resumeData={resumeData} />
      break
    default:
      templateUI = <BasicTemplate resumeData={resumeData} />
  }
  return <div className="flex flex-col flex-1">{templateUI}</div>
}

export default Template
