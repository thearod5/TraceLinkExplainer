import { objectContainsKeys } from "./TypeUtil";

/*
 * Type Definitions
 */

export interface Dataset {
  name: string;
  summary: string;
}

export interface ArtifactIdentifier {
  type: string;
  id: string;
}

export interface Artifact extends ArtifactIdentifier {
  body: string;
}

export interface ArtifactQuery {
  id: string;
  body: string;
  type: string;
}

/*
 * Type Checkers
 */

export function isDataset(obj?: any): obj is Dataset {
  const requiredKeys = ["name", "summary"]; // TODO: Automate generation of list of keys
  return objectContainsKeys(requiredKeys, obj);
}

export function isNonEmptyDataset(obj?: any): obj is Dataset {
  return isDataset(obj) && obj.name !== "" && obj.summary !== "";
}

export function isArtifact(obj?: any): obj is Artifact {
  const requiredKeys = ["body"];
  return isArtifactIdentifier(obj) && objectContainsKeys(requiredKeys, obj);
}

export function areArtifacts(obj: any): obj is Artifact[] {
  if (Array.isArray(obj)) {
    const containsError = obj.map(isArtifact).some((valid) => valid === false);
    return !containsError;
  } else return false;
}

export function isArtifactIdentifier(obj?: any): obj is ArtifactIdentifier {
  const requiredKeys = ["id", "type"];
  return objectContainsKeys(requiredKeys, obj);
}

export function isArtifactIdentifierList(
  obj: object[]
): obj is ArtifactIdentifier[] {
  const isInvalid = obj
    .map(isArtifactIdentifier)
    .some((isValid) => isValid === false);
  return !isInvalid;
}

export function artifactsAreEqual(a1: Artifact, a2: Artifact) {
  return a1.type === a2.type && a1.id === a2.id;
}

/*
 * Type conversions
 */

export function getArtifactIdentifierInformation(
  artifact: Artifact
): ArtifactIdentifier {
  const { id, type } = artifact;
  return { id, type };
}
