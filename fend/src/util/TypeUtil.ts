import {
  Artifact,
  Dataset,
  SearchItem,
  SearchRoutePayload,
  TraceInformation,
  TraceRetrievalPayload,
  WordDescriptor,
  WordDescriptors,
} from "../../../shared/Dataset";

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
    "datasetName",
    "sourceId",
    "sourceType",
    "targetId",
    "targetType",
  ];
  return objectContainsKeys(requiredKeys, obj, log);
}

function isWordDescriptor(obj?: any, log = false): obj is WordDescriptor {
  const requiredKeys = ["word", "family", "weight"];
  const result =
    objectContainsKeys(requiredKeys, obj, log) &&
    typeof obj.weight === "number" &&
    typeof obj.word === "string" &&
    typeof obj.family === "string";
  if (log && !result) console.log("Failed: ", obj);
  return result;
}

export function isWordDescriptors(
  obj?: any,
  log = false
): obj is WordDescriptors {
  if (!Array.isArray(obj)) return false;
  return !obj
    .map((wordDescriptor: any) => isWordDescriptor(wordDescriptor, log))
    .includes(false);
}

export function isTraceInformation(
  obj: any,
  log = false
): obj is TraceInformation {
  const requiredKeys = [
    "families",
    "sourceWords",
    "targetWords",
    "traceType",
    "score",
  ];
  return (
    objectContainsKeys(requiredKeys, obj, log) &&
    isWordDescriptors(obj.sourceWords, log) &&
    isWordDescriptors(obj.targetWords, log)
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
