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
  };
}
