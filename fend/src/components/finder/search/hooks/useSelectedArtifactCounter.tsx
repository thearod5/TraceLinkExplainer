import { useState } from 'react'
import { ArtifactCallback } from '../../../../types/constants'
import { Artifact } from '../../../../types/Project'

/* Responsible for counting how many artifacts have current been selected
 *
 */
interface SearchResultsPaginationProps {
	totalPages: number
	addArtifact: ArtifactCallback
	removeArtifact: ArtifactCallback
}
export default function useSelectedArtifactCounter (props: SearchResultsPaginationProps): [number, ArtifactCallback, ArtifactCallback] {
  const [numberSelected, setNumberSelected] = useState(0)

  const onSelectArtifact = (artifact: Artifact) => {
    setNumberSelected(numberSelected + 1)
    props.addArtifact(artifact)
  }

  const onRemoveArtifact = (artifact: Artifact) => {
    setNumberSelected(numberSelected - 1)
    props.removeArtifact(artifact)
  }

  return [numberSelected, onSelectArtifact, onRemoveArtifact]
}
