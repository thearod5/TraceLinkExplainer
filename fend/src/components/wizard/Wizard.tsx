import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { IndexCallback, VoidCallback } from '../../constants'
import { setError } from '../../redux/actions'

export const StepContext = React.createContext({
  currentStep: 0
})

export const StepActionsContext = React.createContext({
  onNextStep: () => { console.error('not implemented') },
  onPreviousStep: () => { console.error('not implemented') }
})

interface StepDecoratorProps {
	active: boolean
	onNextStep: VoidCallback
	onPreviousStep: VoidCallback
}

function StepDecorator (props: React.PropsWithChildren<StepDecoratorProps>) {
  const { active, onNextStep, onPreviousStep, children } = props
  if (!active) {
    return null
  }

  if (children === undefined || children === null) { throw Error('step decorator requires a single child') }

  return (
    <StepActionsContext.Provider value={{ onNextStep, onPreviousStep }}>
      {children}
    </StepActionsContext.Provider>
  )
}

export default function Wizard (props: React.PropsWithChildren<{}>) {
  const dispatch = useDispatch()
  const [currentStep, setCurrentStep] = useState(0)

  const children = props.children as React.ReactNode[]

  const onNextStep: IndexCallback = (stepIndex: number) => {
    if (currentStep === children.length - 1) {
      dispatch(setError('cannot move beyond last step'))
    } else if (stepIndex !== currentStep) {
      dispatch(setError('wizard recevied erroneous request for next step'))
    } else {
      setCurrentStep(currentStep + 1)
    }
  }

  const onPreviousStep: IndexCallback = (stepIndex: number) => {
    if (stepIndex === 0) {
      dispatch(setError('cannot move before first step'))
    } else if (stepIndex !== currentStep) {
      dispatch(setError('wizard recevied erroneous request for previous step'))
    } else {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <StepContext.Provider value={{ currentStep }}>
      {children.map((child, stepIndex) => (
        <StepDecorator
          key={stepIndex}
          active={currentStep === stepIndex}
          onNextStep={() => onNextStep(stepIndex)}
          onPreviousStep={() => onPreviousStep(stepIndex)}>{child}</StepDecorator>))}
    </StepContext.Provider>
  )
}
