import { Artifact, isArtifact } from "./Dataset";
import { objectContainsKeys } from "./TypeUtil";

/*
 * Type Definitions
 */

export interface SearchSourceRoutePayload {
  datasetName: string;
  query: string;
  limit: number;
}

export interface SearchTargetRoutePayload extends SearchSourceRoutePayload {
  sourceType: string;
  sourceId: string;
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

export function isSearchSourceRoutePayload(obj?: object, log = false) {
  const requiredKeys = ["datasetName", "query", "limit"];
  return objectContainsKeys(requiredKeys, obj, log);
}

export function isSearchTargetRoutePayload(
  obj?: object,
  log = false
): obj is SearchTargetRoutePayload {
  const requiredKeys = ["sourceType", "sourceId"];
  return (
    isSearchSourceRoutePayload(obj, log) &&
    objectContainsKeys(requiredKeys, obj, log)
  );
}

export function isSearchItem(obj?: object): obj is SearchItem {
  const requiredKeys = ["artifact", "similarity"];
  return (
    objectContainsKeys(requiredKeys, obj) &&
    isArtifact((obj as SearchItem).artifact)
  );
}
