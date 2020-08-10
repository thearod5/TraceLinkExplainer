import { Artifact, Dataset } from "../../../shared/Dataset";
import { MetaData } from "./types";

export function initializeEmptyDataset(): Dataset {
  return {
    name: "",
    summary: "",
  };
}

export function initializeEmptyMetaData(): MetaData {
  return {
    oldStep: -1,
    currentStep: 0,

    sourceArtifact: initializeEmptyArtifact(),
    targetArtifact: initializeEmptyArtifact(),

    selectedSources: [],
    selectedTargets: [],
  };
}

export function initializeEmptyArtifact(): Artifact {
  return {
    id: "",
    body: "",
    type: "",
  };
}
