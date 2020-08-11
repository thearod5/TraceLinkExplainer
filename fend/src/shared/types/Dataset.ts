import { objectContainsKeys } from "./TypeUtil";

/*
 * Type Definitions
 */

export interface Dataset {
  name: string;
  summary: string;
}

export interface Artifact {
  type: string;
  id: string;
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

export function isDataset(obj?: object): obj is Dataset {
  const requiredKeys = ["name", "summary"]; // TODO: Automate generation of list of keys
  return objectContainsKeys(requiredKeys, obj);
}

export function isNonEmptyDataset(obj?: object): obj is Dataset {
  return isDataset(obj) && obj.name !== "" && obj.summary !== "";
}

export function isArtifact(obj?: object): obj is Artifact {
  const requiredKeys = ["id", "body", "type"];
  return objectContainsKeys(requiredKeys, obj);
}
