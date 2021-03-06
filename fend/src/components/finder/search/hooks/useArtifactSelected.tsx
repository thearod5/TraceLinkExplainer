import { useState } from 'react'
import { ArtifactCallback } from '../../../../types/constants'
import { Artifact } from '../../../../types/Project'

export default function useArtifactSelector (): [Artifact[], ArtifactCallback, ArtifactCallback] {
  const [selectedArtifacts, setSelectedArtifacts] = useState<Artifact[]>([])

  const addArtifact = (artifact: Artifact) => {
    setSelectedArtifacts([...selectedArtifacts, artifact])
  }
  const removeArtifact = (artifact: Artifact) => {
    setSelectedArtifacts(selectedArtifacts.filter(a => a.id !== artifact.id))
  }
  return [selectedArtifacts, addArtifact, removeArtifact]
}
