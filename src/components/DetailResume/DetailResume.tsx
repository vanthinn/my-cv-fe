import { FC, useState } from 'react'
import ChooseTemplate from './components/ChooseTemplate/ChooseTemplate'
import { Step, StepIconProps, StepLabel, Stepper } from '@mui/material'
import { styled } from '@mui/material/styles'
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector'
import {
  HiOutlineIdentification,
  HiOutlineAcademicCap,
  HiOutlinePresentationChartBar,
  HiOutlineLightBulb,
} from 'react-icons/hi'
import { FaUserCog } from 'react-icons/fa'
import ProfileCV from './components/ProfileCV'
import EducationCV from './components/EducationCV'
import ExperienceCV from './components/ExperienceCV'
import SkillAndLanguage from './components/SkillAndLanguage'
import Objective from './components/Objective'
import { useStoreActions, useStoreState } from 'easy-peasy'
import { resumeActionSelector, resumeStateSelector } from '../../store'

interface Props {}

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 16,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage: 'linear-gradient(to top, #00c6fb 0%, #005bea 100%);',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage: 'linear-gradient(to top, #00c6fb 0%, #005bea 100%);',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 2,
    border: 0,
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderRadius: 1,
  },
}))

const ColorlibStepIconRoot = styled('div')<{
  ownerState: { completed?: boolean; active?: boolean }
}>(({ theme, ownerState }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
  zIndex: 1,
  color: '#fff',
  width: 40,
  height: 40,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    backgroundImage: 'linear-gradient(to top, #00c6fb 0%, #005bea 100%);',
  }),
  ...(ownerState.completed && {
    backgroundImage: 'linear-gradient(to top, #00c6fb 0%, #005bea 100%);',
  }),
}))

function ColorlibStepIcon(props: StepIconProps) {
  const { active, completed, className } = props

  const icons: { [index: string]: React.ReactElement } = {
    1: <HiOutlineIdentification className="text-2xl" />,
    2: <HiOutlineAcademicCap className="text-2xl" />,
    3: <FaUserCog className="text-2xl" />,
    4: <HiOutlinePresentationChartBar className="text-2xl" />,
    5: <HiOutlineLightBulb className="text-2xl" />,
  }

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}>
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  )
}

const steps = ['Profile', 'Education', 'Experience', 'Skills - Languages', 'Objective']

const DetailResume: FC<Props> = (props): JSX.Element => {
  const { resumeData } = useStoreState(resumeStateSelector)
  const { setResumeData } = useStoreActions(resumeActionSelector)
  const [activeStep, setActiveStep] = useState(0)

  const handleSetTemplate = (template: string) => {
    setResumeData({ ...resumeData, template: template })
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      {resumeData?.title && (
        <div className="p-8 mt-8 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]">
          {!resumeData?.template ? (
            <ChooseTemplate setTemplate={handleSetTemplate} />
          ) : (
            <div>
              <h4 className="text-center font-medium text-2xl mb-4">Create new resume</h4>
              <Stepper
                activeStep={activeStep}
                alternativeLabel
                connector={<ColorlibConnector />}>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>

              {activeStep === 0 && (
                <ProfileCV
                  handleBack={handleBack}
                  activeStep={activeStep}
                  setActiveStep={setActiveStep}
                />
              )}
              {activeStep === 1 && (
                <EducationCV
                  handleBack={handleBack}
                  activeStep={activeStep}
                  setActiveStep={setActiveStep}
                />
              )}

              {activeStep === 2 && (
                <ExperienceCV
                  handleBack={handleBack}
                  activeStep={activeStep}
                  setActiveStep={setActiveStep}
                />
              )}

              {activeStep === 3 && (
                <SkillAndLanguage
                  handleBack={handleBack}
                  activeStep={activeStep}
                  setActiveStep={setActiveStep}
                />
              )}

              {activeStep === 4 && (
                <Objective
                  handleBack={handleBack}
                  activeStep={activeStep}
                  setActiveStep={setActiveStep}
                />
              )}
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default DetailResume
