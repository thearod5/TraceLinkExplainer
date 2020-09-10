import { Artifact, Dataset } from "../shared/types/Dataset";
import { RootState } from "./types";

export function initializeRootState(): RootState {
  return {
    currentStep: 0,
    selectedSources: [],
    selectedTargets: [],
    source: initializeEmptyArtifact(),
    target: initializeEmptyArtifact(),
    error: undefined,
    dataset: initializeEmptyDataset(),
  };
}


export function initializeEmptyDataset(): Dataset {
  return {
    name: "",
    summary: "",
  };
}

export function initializeEmptyArtifact(): Artifact {
  return {
    id: "",
    body: "",
    type: "",
  };
}
