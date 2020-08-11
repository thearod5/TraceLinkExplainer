import { Artifact, isArtifact } from "./Dataset";
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

export function isSearchItem(obj?: object): obj is SearchItem {
  const requiredKeys = ["artifact", "similarity"];
  return (
    objectContainsKeys(requiredKeys, obj) &&
    isArtifact((obj as SearchItem).artifact)
  );
}
