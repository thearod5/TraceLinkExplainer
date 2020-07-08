import {
  Artifact,
  ArtifactQuery,
  SearchItem,
} from "../../../../shared/Dataset";

export type ArtifactClickAction = (artifact: Artifact) => void;

export type SuggestionFunctionType = (
  dataset: string,
  query: string,
  limit: number,
  relatedToArtifact?: ArtifactQuery
) => Promise<SearchItem[]>;
