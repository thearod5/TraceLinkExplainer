import { Artifact } from "../../shared/types/Dataset";
import { SearchItem } from "../../shared/types/Search";
export type ArtifactClickAction = (artifact: Artifact) => void;

export type SuggestionFunctionType = (
  query: string,
  limit: number
) => Promise<SearchItem[]>;
