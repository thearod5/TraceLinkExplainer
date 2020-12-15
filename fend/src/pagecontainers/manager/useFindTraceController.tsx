import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { ElementSetter, SELECT_SOURCE_STEP, SELECT_TARGET_STEP } from '../../constants'
import { Artifact } from '../../operations/types/Dataset'
import { getCurrentStep, getSelectedSources, getSelectedTargets } from '../../redux/selectors'
import NoSourceMessage from '../NoSourceMessage'
import SourceArtifactSearch from '../SourceArtifactSearch'
import TargetArtifactSearch from '../TargetArtifactSearch'
import { DefaultSourceArtifactDisplay } from './controller/PageManagerControllerHelper'

interface FindTraceControllerProps {
	setLeftPanel: ElementSetter;
	setRightPanel: ElementSetter;
}
export default function useFindTraceController (props: FindTraceControllerProps) {
  const { setLeftPanel, setRightPanel } = props
  const selectedSources: Artifact[] = useSelector(getSelectedSources)
  const selectedTargets: Artifact[] = useSelector(getSelectedTargets)
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
}
