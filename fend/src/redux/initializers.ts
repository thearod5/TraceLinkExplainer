import { Dataset } from "../../../shared/Dataset";
import { MetaData } from "./types";
export function initializeEmptyDataset(): Dataset {
  return {
    name: "",
    summary: "",
    artifacts: [],
  };
}

export function initializeEmptyMetaData(): MetaData {
  return {
    oldPage: "",
    currentPage: "",

    sourceArtifact: {
      id: "",
      body: "",
      type: "",
    },
    targetArtifact: {
      id: "",
      body: "",
      type: "",
    },
  };
}
