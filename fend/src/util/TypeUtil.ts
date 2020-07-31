import {
  Artifact,
  Dataset,
  SearchItem,
  SearchRoutePayload,
  TraceInformation,
  TraceRetrievalPayload,
  WordDescriptorMapping,
} from "../../../shared/Dataset";

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
  return (
    objectContainsKeys(requiredKeys, obj) &&
    isArtifact((obj as SearchItem).artifact)
  );
}

export function isSearchRoutePayload(
  obj?: object,
  log = false
): obj is SearchRoutePayload {
  const requiredKeys = [
    "datasetName",
    "sourceType",
    "sourceId",
    "query",
    "limit",
  ];
  return objectContainsKeys(requiredKeys, obj, log);
}

export function isTraceTrievealPayload(
  obj: object,
  log = false
): obj is TraceRetrievalPayload {
  const requiredKeys = [
    "dataset",
    "sourceId",
    "sourceType",
    "targetId",
    "targetType",
  ];
  return objectContainsKeys(requiredKeys, obj, log);
}

export function isWordFamilyDescriptor(obj?: any, log = false) {
  const requiredKeys = ["color", "weight"];
  return (
    objectContainsKeys(requiredKeys, obj, log) &&
    typeof obj.weight === "number" &&
    typeof obj.color === "string"
  );
}

export function isWordDescriptorMapping(
  obj?: any
): obj is WordDescriptorMapping {
  for (let key in obj) {
    let value: any = obj[key] as object;
    if (typeof value !== "object" || !isWordFamilyDescriptor(value))
      return false;
  }
  return true;
}

export function isTraceInformation(
  obj: any,
  log = false
): obj is TraceInformation {
  const requiredKeys = [
    "sourceWords",
    "targetWords",
    "wordRootMapping",
    "wordWeightMapping",
    "traceType",
    "score",
  ];
  return (
    objectContainsKeys(requiredKeys, obj, log) &&
    isWordDescriptorMapping(obj.wordMapping)
  );
}

export function objectContainsKeys(
  requiredKeys: string[],
  obj?: object,
  log?: any
) {
  if (obj === undefined) return false;
  for (let requiredKeyIndex in requiredKeys) {
    let requiredKey: string = requiredKeys[requiredKeyIndex];
    if (!(requiredKey in obj)) {
      if (log) console.log(`Could not find key: ${requiredKey}`);
      return false;
    }
  }
  return true;
}
