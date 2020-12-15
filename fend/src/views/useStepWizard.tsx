
import React, { ReactElement, useState } from 'react'
import { useDispatch } from 'react-redux'
import { VoidCallback } from '../constants'
import { BiPanelView } from '../pagecontainers/manager/SplitPanelView'
import { setError } from '../redux/actions'

export type StepValidator = () => string | null
export type StepChangeHandler = () => void
export type StepRender = () => [ReactElement, ReactElement]
export type StepPayload = [StepRender, StepValidator]
export type StepHook = (onStepDone: StepChangeHandler) => StepPayload
export interface StepProps {
  onStepDone: VoidCallback
}
export default function useStepWizard (steps: StepHook[]) {
  const dispatch = useDispatch()
  const [currentStep, setCurrentStep] = useState(0)

  const onStepDone: StepChangeHandler = () => {
    const newStep = currentStep + 1
    if (newStep >= steps.length) {
      dispatch(setError('step out of bounds'))
      return
    }

    const [, stepValidator] = steps[newStep](onStepDone)
    const validationError = stepValidator()
    if (validationError === null) {
      setCurrentStep(newStep)
    } else {
      dispatch(setError(validationError))
    }
  }
  const [hookRender, _] = steps[currentStep](onStepDone)
  const [leftPanel, rightPanel] = hookRender()
  console.log(currentStep, steps[currentStep], leftPanel, hookRender)

  return (
    <div>
      <BiPanelView
        leftPanel={leftPanel}
        rightPanel={rightPanel}
      />
    </div>
  )
}
