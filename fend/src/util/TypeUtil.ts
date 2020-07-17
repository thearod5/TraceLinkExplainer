import { Artifact, Dataset } from "../../../shared/Dataset";

export function objectContainsKeys(obj?: object, requiredKeys: string[]) {
  if (obj === undefined) return false;
  for (let requiredKeyIndex in requiredKeys) {
    let requiredKey: string = requiredKeys[requiredKeyIndex];
    if (!(requiredKey in obj)) return false;
  }
  return true;
}

export function isDataset(obj?: object): obj is Dataset {
  const requiredKeys = ["name", "summary", "artifacts"];
  return objectContainsKeys(obj, requiredKeys);
}

export function isArtifact(obj?: object): obj is Artifact {
  const requiredKeys = ["id", "body", "type"];
  return objectContainsKeys(obj, requiredKeys);
}
