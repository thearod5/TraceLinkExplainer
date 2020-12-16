import React from 'react'
import { searchForSourceArtifact } from '../../../api/search'
import { SELECT_TARGETS_ROUTE } from '../../../constants'
import { setSelectedSources } from '../../../redux/actions'
import SearchController from '../search/SearchController'

export default function SourceArtifactSearch () {
  return (
    <SearchController
      searchFunction={searchForSourceArtifact}
      onArtifactsSelected={setSelectedSources}
      nextPageLocation={SELECT_TARGETS_ROUTE}
    />
  )
}
