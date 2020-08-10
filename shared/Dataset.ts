export interface Dataset {
  name: string;
  summary: string;
}

export interface Artifact {
  type: string;
  id: string;
  body: string;
}

export interface ArtifactQuery {
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
  limit: number;
}

export interface TraceRetrievalPayload {
  datasetName: string;
  sourceId: string;
  sourceType: string;
  targetId: string;
  targetType: string;
}

export interface SearchResponse {
  searchItems: SearchItem[];
}

export type FamilyColors = Record<string, string>;

export interface WordDescriptor {
  word: string;
  family: string;
  weight: number;
}

export type WordDescriptors = WordDescriptor[];

export interface TraceInformation {
  families: string[];
  sourceWords: WordDescriptors;
  targetWords: WordDescriptors;
  traceType: string;
  score: number;
}

export interface SearchFilter {
  attribute: string;
  action: string;
  value: string | number;
  lower?: number;
  upper?: number;
}
