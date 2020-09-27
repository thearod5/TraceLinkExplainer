import { Artifact, ArtifactIdentifier, Dataset } from "../shared/types/Dataset";
import { Trace } from "../shared/types/Trace";

export interface RootState {
  dataset: Dataset;
  selectedSources: Artifact[];
  selectedTargets: Artifact[];
  selectedSourceIndex: number;
  selectedTargetIndex: number;
  traceSourceIndex: number;
  traceTargetIndex: number;
  error: string | undefined;
  currentStep: number;
  trace: Trace
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
