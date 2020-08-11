import store from "../redux/store";
import { Artifact } from "../shared/types/Dataset";
import { SearchItem, SearchResponse } from "../shared/types/Search";
import { BASE_URL, post } from "./base";
import { createAlertMessage, CustomError, isError } from "./errors";

interface SourceSearchPayload {
  datasetName: string;
  query: string;
  limit: number;
}

interface TargetSearchPayload extends SourceSearchPayload {
  sourceType: string;
  sourceId: string;
}

export type ServerResponse = CustomError | SearchResponse;

export async function searchForSourceArtifact(
  datasetName: string,
  query: string,
  limit: number
): Promise<SearchItem[]> {
  const searchUrl = [BASE_URL, "source"].join("/");
  const payload: SourceSearchPayload = { datasetName, query, limit };
  console.log(payload);
  return baseSearchFunction(searchUrl, payload);
}

export async function searchForTargetArtifact(
  datasetName: string,
  query: string,
  limit: number
): Promise<SearchItem[]> {
  const sourceArtifact: Artifact = store.getState().metaData.sourceArtifact;
  if (sourceArtifact.id === "")
    throw Error(
      "cannot search for target artifact without a source artifact selected"
    );

  const searchUrl = [BASE_URL, "target"].join("/");
  const payload: TargetSearchPayload = {
    datasetName,
    query,
    limit,
    sourceType: sourceArtifact.type,
    sourceId: sourceArtifact.id,
  };
  return baseSearchFunction(searchUrl, payload);
}

async function baseSearchFunction(
  url: string,
  payload: SourceSearchPayload
): Promise<SearchItem[]> {
  const response: ServerResponse = await (post(url, payload) as Promise<
    SearchResponse
  >);
  if (isError(response)) {
    alert(createAlertMessage(response));
    return [];
  }
  return response.searchItems;
}
