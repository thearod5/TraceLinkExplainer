import { Dataset } from "../../../shared/Dataset";
import { MetaData } from "./types";
export function initializeEmptyDataset(): Dataset {
  return {
    name: "",
    summary: "",
    artifactSets: [],
  };
}

export function initializeEmptyMetaData(): MetaData {
  return {
    oldPage: "",
    currentPage: "",

    sourceArtifact: {
      type: "",
      artifact: {
        id: "",
        body: "",
      },
    },
    targetArtifact: {
      type: "",
      artifact: {
        id: "",
        body: "",
      },
    },
  };
}
