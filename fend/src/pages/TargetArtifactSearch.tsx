import React from 'react'
import { searchForTargetArtifact } from '../api/search'
import { VIEW_TRACE_ROUTE } from '../constants'
import SearchController from '../components/search/SearchController'
import { setSelectedTargets } from '../redux/actions'

interface TargetArtifactSearchProps { }

export default function TargetArtifactSearch (props: TargetArtifactSearchProps) {
  return (
    <SearchController
      searchFunction={searchForTargetArtifact}
      onArtifactsSelected={setSelectedTargets}
      nextPageLocation={VIEW_TRACE_ROUTE}
    />
  )
}
