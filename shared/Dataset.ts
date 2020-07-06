interface Dataset {
  name: string;
  summary: string;
  artifactSets: Array<ArtifactSet>;
}

interface ArtifactSet {
  name: string;
  artifacts: Array<Artifact>;
}

interface Artifact {
  id: string;
  body: string;
}

interface ArtifactQuery {
  id: string;
  body: string;
  type: string;
}

export type { Dataset, ArtifactSet, Artifact, ArtifactQuery };
