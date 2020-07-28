interface Dataset {
  name: string;
  summary: string;
  artifacts: Array<Artifact>;
}

interface Artifact {
  type: string;
  id: string;
  body: string;
}

interface ArtifactQuery {
  id: string;
  body: string;
  type: string;
}

export interface SearchItem {
  artifact: Artifact;
  similarity: number;
}

export interface SearchRoutePayload {
  datasetName: string;
  sourceType: string;
  sourceId: string;
  query: string;
  limit: number
}

export interface SearchResponse {
  searchItems: SearchItem[];
}

export type { Dataset, Artifact, ArtifactQuery };
