import useMaintainFreshTraceData from '../pagecontainers/manager/useMaintainFreshTraceData'
import useSelectSources from './steps/useSelectSources'
import useSelectTargets from './steps/useSelectTargets'
import useViewTrace from './steps/useViewTrace'
import useStepWizard from './useStepWizard'

export default function WizardView () {
  console.log('WIZARD')
  useMaintainFreshTraceData()

  const body = useStepWizard([useSelectSources, useSelectTargets, useViewTrace])
  return body
}
