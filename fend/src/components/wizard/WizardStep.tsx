import React, { useState } from 'react'
import { VoidCallback } from '../../constants'
import { StepActionsContext } from './types'
import { WizardFooter } from './WizardFooter'

interface StepDecoratorProps {
  active: boolean;
  stepNames: [string | null, string, string | null];
  onNextStep: VoidCallback;
  onPreviousStep: VoidCallback;
}
export function WizardStep (props: React.PropsWithChildren<StepDecoratorProps>) {
  const { active, onNextStep, onPreviousStep, children, stepNames } = props
  const [nextStepReady, setNextStepReady] = useState(false)

  if (!active) {
    return null
  }
  if (children === undefined || children === null) { throw Error('step decorator requires a single child') }

  const onStepUnreadyToExit = () => {
    setNextStepReady(false)
  }

  const onStepReadyToExit = () => {
    setNextStepReady(true)
  }

  return (
    <div className='flexColumn' style={{ height: '100%' }} >
      <div style={{ height: '90%' }}>
        <StepActionsContext.Provider value={{ onStepReadyToExit, onStepUnreadyToExit }}>
          {children}
        </StepActionsContext.Provider>
      </div>
      <div style={{ height: '10%' }}>
        <WizardFooter
          stepNames={[stepNames[0], stepNames[1], nextStepReady ? stepNames[2] : null]}
          onNextStep={() => onNextStep()}
          onPreviousStep={() => onPreviousStep()} />
      </div>
    </div>

  )
}
