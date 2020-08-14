import { Artifact, Dataset } from "../shared/types/Dataset";

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
