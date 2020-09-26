import { Artifact, Dataset } from "../shared/types/Dataset";
import { Trace } from "../shared/types/Trace";

export function initializeEmptyDataset(): Dataset {
  return {
    name: "",
    summary: "",
  };
}

export function initializeEmptyTrace(): Trace {
  return {
    targetWords: null,
    sourceWords: null,
    relationships: null,
    relationshipColors: null,
    selectedWord: null
  }
}

export function initializeEmptyArtifact(): Artifact {
  return {
    id: "",
    body: "",
    type: "",
  };
}
