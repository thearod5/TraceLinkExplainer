import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { ElementSetter, SELECT_SOURCE_STEP, SELECT_TARGET_STEP, VIEW_TRACE_STEP } from '../constants'
import { Artifact } from '../operations/types/Dataset'
import { Trace } from '../operations/types/Trace'
import { DefaultSourceArtifactDisplay } from '../pagecontainers/DefaultSourceArtifactDisplay'
import NoSourceMessage from '../pagecontainers/NoSourceMessage'
import SourceArtifactSearch from '../pagecontainers/SourceArtifactSearch'
import TargetArtifactSearch from '../pagecontainers/TargetArtifactSearch'
import { SelectedArtifactsContainer } from '../pagecontainers/TracedArtifactsDisplay'
import { getCurrentStep, getSelectedSources, getSelectedTargets, getTrace } from '../redux/selectors'
import store from '../redux/store'

interface FindTraceControllerProps {
	setLeftPanel: ElementSetter;
	setRightPanel: ElementSetter;
}
export default function useLoadPanels (props: FindTraceControllerProps) {
  const { setLeftPanel, setRightPanel } = props
  const selectedSources: Artifact[] = useSelector(getSelectedSources)
  const selectedTargets: Artifact[] = useSelector(getSelectedTargets)
  const trace: Trace = useSelector(getTrace)
  const currentStep: number = useSelector(getCurrentStep)

  /*
  * Step. 1 - select sources
  */
  useEffect(() => {
    if (currentStep === SELECT_SOURCE_STEP) {
      setLeftPanel(<SourceArtifactSearch />)
      setRightPanel(<NoSourceMessage />)
    }
  }, [currentStep, setLeftPanel, setRightPanel])

  /*
  * Step. 2 - select targets
  */
  useEffect(() => {
    if (currentStep === SELECT_TARGET_STEP) {
      setLeftPanel(
        <DefaultSourceArtifactDisplay />)
    }
    // eslint-disable-next-line
  }, [currentStep, selectedSources, setLeftPanel])
  // separate so reloading one does not affect the other
  useEffect(() => {
    if (currentStep === SELECT_TARGET_STEP) {
      setRightPanel(<TargetArtifactSearch />)
    }
  }, [currentStep, selectedTargets, setRightPanel])

  /*
   * Step 4
   */
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

export function updateTraceArtifactDisplayInPanel (
  type: 'SOURCE' | 'TARGET',
  setPanel: ElementSetter,
  stepsRequired: number[]
) {
  const currentStep = store.getState().currentStep
  if (stepsRequired.includes(currentStep)) {
    const tracePanel = < SelectedArtifactsContainer
      type={type}
    />

    setPanel(
      tracePanel
    )
  }
}
