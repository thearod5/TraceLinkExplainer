import { Artifact } from '../../../../operations/types/Project'
export type ArtifactClickAction = (artifact: Artifact) => void;

export type SuggestionFunctionType = (
  query: string,
  limit: number
) => Promise<Artifact[]>;
