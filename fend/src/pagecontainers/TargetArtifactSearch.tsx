import React from 'react'
import { searchForTargetArtifact } from '../api/search'
import SearchController from '../components/search/SearchController'
import { VIEW_TRACE_ROUTE } from '../constants'
import { setSelectedTargets } from '../redux/actions'
import { StepProps } from '../views/useStepWizard'

export default function TargetArtifactSearch (props: StepProps) {
  return (
    <SearchController
      searchFunction={searchForTargetArtifact}
      onArtifactsSelected={setSelectedTargets}
      nextPageLocation={VIEW_TRACE_ROUTE}
      onStepDone={props.onStepDone}
    />
  )
}
