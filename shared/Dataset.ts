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

export type { Dataset, Artifact, ArtifactQuery };
