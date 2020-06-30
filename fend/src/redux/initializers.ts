import { Dataset } from "../../../shared/Dataset";

export default function initializeData(): Dataset {
  return {
    name: "",
    summary: "",
    artifactSets: [],
  };
}
