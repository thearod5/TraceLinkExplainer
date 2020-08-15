import store from "../redux/store";
import {
  Artifact,
  ArtifactIdentifier,
  Dataset,
  isNonEmptyDataset,
} from "../shared/types/Dataset";
import {
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
): Promise<Artifact[]> {
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
): Promise<Artifact[]> {
  return new Promise((resolve, reject) => {
    const dataset: Dataset = store.getState().dataset;

    if (!isNonEmptyDataset(dataset)) {
      return reject(Error("Dataset not selected."));
    }

    const sources: ArtifactIdentifier[] = store.getState().selectedSources;
    if (sources.length === 0)
      return reject(
        Error(
          "cannot search for target artifact without a source artifact selected"
        )
      );

    const searchUrl = [BASE_URL, "target"].join("/");
    const payload: SearchTargetRoutePayload = {
      datasetName: dataset.name,
      sources,
      query,
      limit,
    };
    return resolve(baseSearchFunction(searchUrl, payload));
  });
}

async function baseSearchFunction(
  url: string,
  payload: SearchSourceRoutePayload
): Promise<Artifact[]> {
  return new Promise((resolve, reject) => {
    (post(url, payload) as Promise<SearchResponse>).then(
      (response: ServerResponse) => {
        if (response === undefined) {
          return reject("Backend is off. Please see system administrator.");
        } else if (isError(response)) {
          return reject(response.error);
        } else if (!("searchItems" in response)) {
          return reject("Response contains no search results.");
        }
        return resolve(response.searchItems);
      }
    );
  });
}
