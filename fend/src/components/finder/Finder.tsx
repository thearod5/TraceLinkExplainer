import React, { useState } from 'react'
import { Artifact } from '../../operations/types/Dataset'
import { SplitPanelView } from '../meta/SplitPanelView'
import SourceArtifactSearch from './panels/SourceArtifactSearch'
import TargetArtifactSearch from './panels/TargetArtifactSearch'

const FinderContext = React.createContext({
  sourceArtifacts: [] as Artifact[],
  targetArtifacts: [] as Artifact[],
  addSourceArtifact: (artifacts: Artifact) => console.error('not implemented'),
  removeSourceArtifact: (artifacts: Artifact) => console.error('not implemented'),
  addTargetArtifact: (artifacts: Artifact) => console.error('not implemented'),
  removeTargetArtifact: (artifacts: Artifact) => console.error('not implemented')
})

export default function Finder () {
  const [tracedArtifacts, setTracedArtifacts] = useState<Record<string, Artifact[]>>({})

  const addSourceArtifact = (artifact:Artifact) => {
    tracedArtifacts[artifact.id] = []
  }

  return (
    <SplitPanelView
      leftPanel={<SourceArtifactSearch />}
      rightPanel={<TargetArtifactSearch />}
    />
  )
}
