import { Box } from '@material-ui/core'
import React from 'react'
import { ArtifactCallback, StringCallback } from '../../../../../constants'
import { Artifact } from '../../../../../operations/types/Dataset'
import SearchBar from '../bar/SearchBar'
import SearchResults from './SearchResults'

/* Responsible for displaying given artifacts and submitting search request on behalf of the user
 *
 */
interface SearchControllerProps {
	artifacts: Artifact[]
	onSearch: StringCallback
	isLoading: boolean
	addArtifact: ArtifactCallback
	removeArtifact: ArtifactCallback
}
export default function Search (props: SearchControllerProps) {
  return (
    <Box>
      <SearchBar onSearch={(query: string) => props.onSearch(query)} />
      <SearchResults
        artifacts={props.artifacts}
        addArtifact={props.addArtifact}
        removeArtifact={props.removeArtifact}
        isLoading={props.isLoading} />
    </Box>)
}
