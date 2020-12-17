import { useState } from 'react'
import { ArtifactCallback } from '../../../../../constants'
import { Artifact } from '../../../../../operations/types/Dataset'

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
