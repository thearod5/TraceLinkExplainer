import { Words } from './Trace'
import { objectContainsKeys } from './TypeUtil'

/*
 * Type Definitions
 */

export interface Dataset {
  id: string;
  name: string;
  description: string;
}

export interface ArtifactIdentifier {
  project:string;
  name: string;
  type: string;
}

export interface Artifact extends ArtifactIdentifier {
  body: string;
}

export interface ArtifactQuery {
  id: string;
  body: string;
  type: string;
}

export interface ArtifactDisplayModel {
  artifact: Artifact;
  words: Words;
}

/*
 * Type Checkers
 */

export function isDataset (obj?: any): obj is Dataset {
  const requiredKeys = ['name', 'id', 'description'] // TODO: Automate generation of list of keys
  return objectContainsKeys(requiredKeys, obj)
}

export function isNonEmptyDataset (obj?: any): obj is Dataset {
  return isDataset(obj) && obj.id !== ''
}

export function isArtifact (obj?: any): obj is Artifact {
  const requiredKeys = ['body']
  return isArtifactIdentifier(obj) && objectContainsKeys(requiredKeys, obj)
}

export function areArtifacts (obj: any): obj is Artifact[] {
  if (Array.isArray(obj)) {
    const containsError = obj.map(isArtifact).some((valid) => valid === false)
    return !containsError
  } else return false
}

export function isArtifactIdentifier (obj?: any): obj is ArtifactIdentifier {
  const requiredKeys = ['project', 'name', 'type']
  return objectContainsKeys(requiredKeys, obj)
}

export function isArtifactIdentifierList (
  obj: object[]
): obj is ArtifactIdentifier[] {
  const isInvalid = obj
    .map(isArtifactIdentifier)
    .some((isValid) => isValid === false)
  return !isInvalid
}

export function artifactsAreEqual (a1: Artifact, a2: Artifact) {
  return a1.type === a2.type && a1.name === a2.name
}

/*
 * Type conversions
 */

export function getArtifactIdentifier (artifact: Artifact): ArtifactIdentifier {
  const { project, name: id, type } = artifact
  return { project, name: id, type }
}
