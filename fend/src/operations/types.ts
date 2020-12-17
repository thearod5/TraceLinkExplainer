import { Artifact, ArtifactIdentifier, Project } from './types/Project'
import { Trace } from './types/Trace'

export interface RootState {
  dataset: Project;
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
