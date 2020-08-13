import store from "../redux/store";
import {
  Artifact,
  Dataset,
  getArtifactIdentifierInformation,
  isNonEmptyDataset,
} from "../shared/types/Dataset";
import {
  SearchItem,
  SearchResponse,
  SearchSourceRoutePayload,
  SearchTargetRoutePayload,
} from "../shared/types/Search";
import { BASE_URL, post } from "./base";
import { CustomError, isError } from "./errors";

export type ServerResponse = CustomError | SearchResponse;

export async function searchForSourceArtifact(
  query: string,
  limit: number
): Promise<SearchItem[]> {
  return new Promise((resolve, reject) => {
    const dataset: Dataset = store.getState().dataset;
    if (!isNonEmptyDataset(dataset)) {
      return reject(Error("Dataset not selected."));
    }
    const searchUrl = [BASE_URL, "source"].join("/");
    const payload: SearchSourceRoutePayload = {
      datasetName: dataset.name,
      query,
      limit,
    };
    return resolve(baseSearchFunction(searchUrl, payload));
  });
}

export async function searchForTargetArtifact(
  query: string,
  limit: number
): Promise<SearchItem[]> {
  return new Promise((resolve, reject) => {
    const dataset: Dataset = store.getState().dataset;

    if (!isNonEmptyDataset(dataset)) {
      return reject(Error("Dataset not selected."));
    }

    const sources: Artifact[] = store.getState().metaData.selectedSources;
    if (sources.length === 0)
      return reject(
        Error(
          "cannot search for target artifact without a source artifact selected"
        )
      );

    const searchUrl = [BASE_URL, "target"].join("/");
    const payload: SearchTargetRoutePayload = {
      datasetName: dataset.name,
      sources: sources.map(getArtifactIdentifierInformation),
      query,
      limit,
    };
    return resolve(baseSearchFunction(searchUrl, payload));
  });
}

async function baseSearchFunction(
  url: string,
  payload: SearchSourceRoutePayload
): Promise<SearchItem[]> {
  return new Promise((resolve, reject) => {
    (post(url, payload) as Promise<SearchResponse>).then(
      (response: ServerResponse) => {
        if (isError(response)) {
          return reject(response.error);
        }
        return resolve(response.searchItems);
      }
    );
  });
}
