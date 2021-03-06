import { Artifact, Project } from './Project'
import { Trace } from './Trace'

export function initializeEmptyDataset (): Project {
  return {
    id: '',
    name: '',
    description: ''
  }
}

export function initializeEmptyTrace (): Trace {
  return {
    targetWords: null,
    sourceWords: null,
    relationships: null,
    relationshipColors: null,
    selectedWord: null
  }
}

export function initializeEmptyArtifact (): Artifact {
  return {
    id: '',
    name: '',
    body: '',
    type: '',
    project: ''
  }
}
