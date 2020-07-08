import { Artifact, SearchItem } from "../../../shared/Dataset";
import store from "../redux/store";
import { BASE_URL, post } from "./base";

interface SearchResponse {
  searchItems: SearchItem[];
}

export async function searchForSourceArtifact(
  dataset: string,
  query: string,
  limit: number
): Promise<SearchItem[]> {
  const searchUrl = [BASE_URL, "source", dataset, limit].join("/");
  return baseSearchFunction(searchUrl, query);
}

export async function searchForTargetArtifact(
  dataset: string,
  query: string,
  limit: number
): Promise<SearchItem[]> {
  const sourceArtifact: Artifact = store.getState().metaData.sourceArtifact;
  if (sourceArtifact.id === "")
    throw Error(
      "cannot search for target artifact without a source artifact selected"
    );

  const searchUrl = [
    BASE_URL,
    "target",
    dataset,
    sourceArtifact.type,
    sourceArtifact.id,
    limit,
  ].join("/");
  return baseSearchFunction(searchUrl, query);
}

async function baseSearchFunction(
  url: string,
  query: string
): Promise<SearchItem[]> {
  const response: SearchResponse = await (post(url, {
    query: query,
  }) as Promise<SearchResponse>);
  return response.searchItems;
}
