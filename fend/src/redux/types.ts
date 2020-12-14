import { Artifact, ArtifactIdentifier, Dataset } from '../operations/types/Dataset'
import { Trace } from '../operations/types/Trace'

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
  loading: boolean;
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
