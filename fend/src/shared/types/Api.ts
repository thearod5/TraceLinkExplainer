import { Artifact, isArtifact } from "./Dataset";
import { isWordDescriptors, TraceInformation } from "./TraceInformation";
import { objectContainsKeys } from "./TypeUtil";
/*
 *
 */

//TODO: Is bend using this??
export interface SearchRoutePayload {
  datasetName: string;
  sourceType: string;
  sourceId: string;
  query: string;
  limit: number;
}

export interface TraceRetrievalPayload {
  datasetName: string;
  sourceId: string;
  sourceType: string;
  targetId: string;
  targetType: string;
}

export interface SearchResponse {
  searchItems: SearchItem[];
}

export interface SearchItem {
  artifact: Artifact;
  similarity: number;
}

export interface SearchFilter {
  attribute: string;
  action: string;
  value: string | number;
  lower?: number;
  upper?: number;
}

/*
 * Type Checkers
 */

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

export function isSearchItem(obj?: object): obj is SearchItem {
  const requiredKeys = ["artifact", "similarity"];
  return (
    objectContainsKeys(requiredKeys, obj) &&
    isArtifact((obj as SearchItem).artifact)
  );
}
