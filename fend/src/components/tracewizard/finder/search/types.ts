import { Artifact } from '../../../../operations/types/Dataset'
export type ArtifactClickAction = (artifact: Artifact) => void;

export type SuggestionFunctionType = (
  query: string,
  limit: number
) => Promise<Artifact[]>;
