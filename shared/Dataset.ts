export interface Dataset {
  name: string;
  summary: string;
  artifacts: Array<Artifact>;
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
  dataset: string;
  sourceId: string;
  sourceType: string;
  targetId: string;
  targetType: string;
}

export interface SearchResponse {
  searchItems: SearchItem[];
}

export interface WordFamily {
  word: string;
  root: string; // Porter Stemmer Root
}

export interface WordFamilyDescriptors {
  color: string;
  weight: number;
}

export type WordRootMapping = Record<string, string>; //maps word to root
export type WordDescriptorMapping = Record<string, WordFamilyDescriptors>; //Maps root to Descriptor

export interface TraceInformation {
  sourceWords: string[];
  targetWords: string[];
  wordRootMapping: WordRootMapping;
  wordWeightMapping: WordDescriptorMapping;
  traceType: string;
  score: number;
}
