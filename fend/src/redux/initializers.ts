import { Artifact, Dataset } from '../operations/types/Dataset'
import { Trace } from '../operations/types/Trace'
import { v4 as uuidv4 } from 'uuid'

export function initializeEmptyDataset (): Dataset {
  return {
    id: uuidv4(),
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
    name: '',
    body: '',
    type: '',
    project: ''
  }
}
