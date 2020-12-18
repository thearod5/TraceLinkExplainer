import { Box } from '@material-ui/core'
import React, { useContext, useState } from 'react'
import { AppContext } from '../../../App'
import { IndexCallback } from '../../../constants'
import { StepContext } from './types'
import { WizardStep } from './WizardStep'

interface WizardProps {
  stepNames: string[]
}

export default function Wizard (props: React.PropsWithChildren<WizardProps>) {
  const [currentStep, setCurrentStep] = useState(0)
  const { setError } = useContext(AppContext)

  const children = props.children as React.ReactNode[]
  const stepNames = props.stepNames.map((name, nameIndex) => (nameIndex + 1) + '. ' + name)

  const onNextStep: IndexCallback = (stepIndex: number) => {
    console.log('on next step', stepIndex)
    if (currentStep === children.length - 1) {
      setError('cannot move beyond last step')
    } else if (stepIndex !== currentStep) {
      setError('wizard recevied erroneous request for next step')
    } else {
      setCurrentStep(currentStep + 1)
    }
  }

  const onPreviousStep: IndexCallback = (stepIndex: number) => {
    if (stepIndex === 0) {
      setError('cannot move before first step')
    } else if (stepIndex !== currentStep) {
      setError('wizard recevied erroneous request for previous step')
    } else {
      setCurrentStep(currentStep - 1)
    }
  }

  const previousStepName = currentStep === 0 ? null : stepNames[currentStep - 1]
  const nextStepName = currentStep === children.length - 1 ? null : stepNames[currentStep + 1]

  return (
    <Box className="sizeFull">
      <StepContext.Provider value={{ currentStep }}>
        {children.map((child, stepIndex) => (
          <WizardStep
            key={stepIndex}
            active={currentStep === stepIndex}
            stepNames={[previousStepName, stepNames[currentStep], nextStepName]}
            onNextStep={() => onNextStep(stepIndex)}
            onPreviousStep={() => onPreviousStep(stepIndex)}>{child}</WizardStep>))}
      </StepContext.Provider>
    </Box>
  )
}
