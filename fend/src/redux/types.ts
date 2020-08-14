import { Artifact, Dataset } from "../shared/types/Dataset";

export interface RootState {
  dataset: Dataset;
  selectedSources: Artifact[];
  selectedTargets: Artifact[];
  error: string | undefined;
  currentStep: number;
}

export interface ArtifactMutatorActionType {
  type: string;
  payload: Artifact[];
}

export interface MetaData {
  oldStep: number;
  currentStep: number;
  selectedSources: Artifact[];
  selectedTargets: Artifact[];
  error: string | undefined;
}
