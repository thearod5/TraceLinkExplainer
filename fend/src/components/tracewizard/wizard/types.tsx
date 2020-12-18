import React from 'react'

export const StepContext = React.createContext({
  currentStep: 0
})

export const StepActionsContext = React.createContext({
  onStepReadyToExit: () => { console.error('not implemented') },
  onStepUnreadyToExit: () => { console.error('not implemented') }
})
