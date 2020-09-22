import {
  Artifact,
  ArtifactIdentifier,
  isArtifactIdentifierList,
} from "./Dataset";
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
  sources: ArtifactIdentifier[];
}

export interface SearchResponse {
  searchItems: Artifact[];
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
  obj?: any,
  log = false
): obj is SearchTargetRoutePayload {
  const requiredKeys = ["sources"];
  return (
    isSearchSourceRoutePayload(obj, log) &&
    objectContainsKeys(requiredKeys, obj, log) &&
    isArtifactIdentifierList(obj.sources)
  );
}
