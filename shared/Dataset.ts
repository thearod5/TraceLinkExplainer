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

export type { Dataset, Artifact, ArtifactQuery };
