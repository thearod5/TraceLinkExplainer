import { Box } from '@material-ui/core'
import React, { useCallback, useState } from 'react'
import { VoidCallback } from '../../../constants'
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

  const onStepUnreadyToExit = useCallback(() => {
    setNextStepReady(false)
  }, [])

  const onStepReadyToExit = useCallback(() => {
    setNextStepReady(true)
  }, [])

  if (!active) {
    return null
  }
  if (children === undefined || children === null) { throw Error('step decorator requires a single child') }

  return (
    <Box className='sizeFull flexColumn' >
      <div style={{ height: '90%' }}>
        <StepActionsContext.Provider value={{ onStepReadyToExit, onStepUnreadyToExit }}>
          {children}
        </StepActionsContext.Provider>
      </div>

      <Box boxShadow={3} style={{ height: '10%' }} className='sizeFull centeredColumn'>
        <WizardFooter
          stepNames={[stepNames[0], stepNames[1], nextStepReady ? stepNames[2] : null]}
          onNextStep={() => onNextStep()}
          onPreviousStep={() => onPreviousStep()} />
      </Box>
    </Box>

  )
}
