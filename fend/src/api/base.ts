import { Dataset } from "../../../shared/Dataset";

const BASE_URL = "http://localhost:5000";
const TEST_ENDPOINT = "test";
const DATASET_ENDPOINT = "dataset";

async function getDatasetByName(datasetName: string): Promise<Dataset> {
  return await fetch(
    [BASE_URL, DATASET_ENDPOINT, datasetName].join("/")
  ).then((response) => response.json());
}

async function getDatasetNames(): Promise<string[]> {
  return await fetch(
    [BASE_URL, DATASET_ENDPOINT, "names"].join("/")
  ).then((response) => response.json());
}

async function testCall() {
  return await fetch([BASE_URL, TEST_ENDPOINT].join("/")).then((response) =>
    response.json()
  );
}

export { testCall, getDatasetByName, getDatasetNames };
