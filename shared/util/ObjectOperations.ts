import { Artifact, Dataset, SearchItem, SearchRoutePayload } from "../Dataset";



export function isDataset(obj?: object): obj is Dataset {
  const requiredKeys = ["name", "summary", "artifacts"]; // TODO: Automate generation of list of keys
  return objectContainsKeys(requiredKeys, obj);
}

export function isArtifact(obj?: object): obj is Artifact {
  const requiredKeys = ["id", "body", "type"];
  return objectContainsKeys(requiredKeys, obj);
}

export function isSearchItem(obj?: object): obj is SearchItem {
  const requiredKeys = ["artifact", "similarity"];
  return objectContainsKeys(requiredKeys, obj) && isArtifact((obj as SearchItem).artifact)
}

export function isSearchRoutePayload(obj?: object, log = false): obj is SearchRoutePayload {
  const requiredKeys = ["datasetName", "sourceType", "sourceId", "query", "limit"]
  return objectContainsKeys(requiredKeys, obj, log)
}
export function objectContainsKeys(requiredKeys: string[], obj?: object, log?: any) {
  if (obj === undefined) return false;
  for (let requiredKeyIndex in requiredKeys) {
    let requiredKey: string = requiredKeys[requiredKeyIndex];
    if (!(requiredKey in obj)) {
      if (log)
        console.log(`Could not find key: ${requiredKey}`)
      else
        return false;
    }
  }
  return true;
}