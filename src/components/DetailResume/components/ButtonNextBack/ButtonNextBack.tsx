import { FC } from 'react'
import Button from '../../../Button'
import { Box } from '@mui/material'

interface Props {
  activeStep: number
  handleBack: () => void
  handleNext: any
  type?: string
  isLoading?: boolean
}

const ButtonNextBack: FC<Props> = ({
  activeStep,
  handleBack,
  handleNext,
  type,
  isLoading,
}: Props): JSX.Element => {
  return (
    <div className="flex justify-between mt-8">
      {type === 'save' ? (
        <>
          <Button
            typeButton="cancel"
            onClick={handleBack}>
            Back
          </Button>
          <Button
            typeButton="approve"
            type="submit"
            onClick={handleNext}>
            Save
          </Button>
        </>
      ) : (
        <>
          {' '}
          <Button
            typeButton="cancel"
            disabled={activeStep === 0}
            onClick={handleBack}>
            Back
          </Button>
          <Box sx={{ flex: '1 1 auto' }} />
          <Button
            type="submit"
            loading={isLoading || false}
            disabled={isLoading || false}
            onClick={handleNext}>
            {activeStep < 4 ? 'Next' : 'Finish'}
          </Button>{' '}
        </>
      )}
    </div>
  )
}

export default ButtonNextBack
