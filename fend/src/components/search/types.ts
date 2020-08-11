import { Artifact, ArtifactQuery } from "../../shared/types/Dataset";
import { SearchItem } from "../../shared/types/Search";
export type ArtifactClickAction = (artifact: Artifact) => void;

export type SuggestionFunctionType = (
  dataset: string,
  query: string,
  limit: number,
  relatedToArtifact?: ArtifactQuery
) => Promise<SearchItem[]>;
