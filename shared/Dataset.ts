interface Dataset {
  name: string;
  summary: string;
  artifacts: Array<ArtifactSet>
}

interface ArtifactSet {
  name: string;
  artifacts: Array<Artifact>
}

interface Artifact {
  id: string;
  body: string;
}

export { Dataset, ArtifactSet, Artifact }