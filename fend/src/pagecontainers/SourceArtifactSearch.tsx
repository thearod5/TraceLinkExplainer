import React from 'react'
import { searchForSourceArtifact } from '../api/search'
import SearchController from '../components/search/SearchController'
import { SELECT_TARGETS_ROUTE } from '../constants'
import { setSelectedSources } from '../redux/actions'
import { StepProps } from '../views/useStepWizard'

export default function SourceArtifactSearch (props: StepProps) {
  return (
    <SearchController
      searchFunction={searchForSourceArtifact}
      onArtifactsSelected={setSelectedSources}
      nextPageLocation={SELECT_TARGETS_ROUTE}
      onStepDone={props.onStepDone}
    />
  )
}
