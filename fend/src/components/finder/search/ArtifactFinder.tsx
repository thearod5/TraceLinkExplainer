import { Box } from '@material-ui/core'
import React, { useContext } from 'react'
import { StringCallback } from '../../../types/constants'
import { Artifact } from '../../../types/Project'
import { ArtifactSelectContext } from '../ArtifactSetFinder'
import SearchBar from './bar/SearchBar'
import SearchResults from './results/SearchResults'

/* Provides view for querying and selecting artifacts
 *
 */
interface SearchControllerProps {
	artifacts: Artifact[]
	onSearch: StringCallback
	isLoading: boolean
}
export default function ArtifactFinder (props: SearchControllerProps) {
  const { onAddArtifact, onRemoveArtifact } = useContext(ArtifactSelectContext)
  return (
    <Box className="sizeFull" style={{ height: '90%' }}>
      <SearchBar onSearch={(query: string) => props.onSearch(query)} />
      <SearchResults
        artifacts={props.artifacts}
        addArtifact={onAddArtifact}
        removeArtifact={onRemoveArtifact}
        isLoading={props.isLoading} />
    </Box>)
}
