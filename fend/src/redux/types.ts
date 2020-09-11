import { Artifact, ArtifactIdentifier, Dataset } from "../shared/types/Dataset";

export interface RootState {
  dataset: Dataset;
  selectedSources: Artifact[];
  selectedTargets: Artifact[];
  sourceIndex: number;
  targetIndex: number;
  error: string | undefined;
  currentStep: number;
}

export interface ArtifactMutatorActionType {
  type: string;
  payload: ArtifactIdentifier[];
}

export interface MetaData {
  oldStep: number;
  currentStep: number;
  selectedSources: Artifact[];
  selectedTargets: Artifact[];
  error: string | undefined;
}
