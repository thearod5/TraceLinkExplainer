import { Artifact, ArtifactQuery } from "../../../../shared/Dataset";

export interface SearchResults {
  items: SearchItem[];
  type: string;
}

export interface SearchItem {
  artifact: Artifact;
  similarity: number;
}

export type SuggestionFunctionType = (
  query: string,
  relatedToArtifact?: ArtifactQuery
) => string[];
