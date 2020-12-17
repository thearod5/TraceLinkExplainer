import { Artifact, Dataset } from './types/Dataset'
import { Trace } from './types/Trace'

export function initializeEmptyDataset (): Dataset {
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
