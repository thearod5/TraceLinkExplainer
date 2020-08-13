import { Dataset } from "../shared/types/Dataset";
import { BASE_URL, DATASET_ENDPOINT } from "./base";

export async function getDatasetByName(datasetName: string): Promise<Dataset> {
  return await fetch(
    [BASE_URL, DATASET_ENDPOINT, datasetName].join("/")
  ).then((response) => response.json());
}

export async function getDatasetNames(): Promise<string[]> {
  return await fetch(
    [BASE_URL, DATASET_ENDPOINT, "names"].join("/")
  ).then((response) => response.json());
}
