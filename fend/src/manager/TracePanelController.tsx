import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { ElementSetter, SELECT_TARGET_STEP, VIEW_TRACE_STEP } from '../constants'
import { Artifact } from '../operations/types/Dataset'
import { Trace } from '../operations/types/Trace'
import { getCurrentStep, getSelectedSources, getSelectedTargets, getTrace } from '../redux/selectors'
import { updateTraceArtifactDisplayInPanel } from './controller/PageManagerControllerHelper'
import useFindTraceController from './useFindTraceController'
import useViewTraceController from './useViewTraceController'

interface TraceManagerProps {
	setLeftPanel: ElementSetter;
	setRightPanel:ElementSetter;
}

/* Hook managing global state between finding source and target artifacts as well as fetching their trace information
 *
 */
export default function useTraceManager (props: TraceManagerProps) {
  const { setLeftPanel, setRightPanel } = props

  const trace: Trace = useSelector(getTrace)
  const currentStep: number = useSelector(getCurrentStep)
  const selectedSources: Artifact[] = useSelector(getSelectedSources)
  const selectedTargets: Artifact[] = useSelector(getSelectedTargets)

  const [hasStaleData, setHasStaleData] = useState(true)

  useFindTraceController({ setLeftPanel, setRightPanel })
  useViewTraceController({ setInitialStartup: setHasStaleData, hasStaleData: hasStaleData })
  useStepChangeListeners(currentStep, setLeftPanel, selectedSources, trace, setRightPanel, selectedTargets)
  useEffect(() => {
    if (currentStep < VIEW_TRACE_STEP) {
      setHasStaleData(true)
    }
  }, [currentStep])
  const isExplanationGraphOpen = trace.selectedWord !== null

  return [isExplanationGraphOpen]
}

function useStepChangeListeners (currentStep: number, setLeftPanel: ElementSetter, selectedSources: Artifact[], trace: Trace, setRightPanel: ElementSetter, selectedTargets: Artifact[]) {
  useEffect(() => {
    updateTraceArtifactDisplayInPanel(
      'SOURCE',
      setLeftPanel,
      [SELECT_TARGET_STEP, VIEW_TRACE_STEP]
    )
  }, [currentStep, selectedSources, trace, setLeftPanel])

  useEffect(() => {
    updateTraceArtifactDisplayInPanel(
      'TARGET',
      setRightPanel,
      [VIEW_TRACE_STEP]
    )
  }, [currentStep, selectedTargets, trace, setRightPanel])
}
