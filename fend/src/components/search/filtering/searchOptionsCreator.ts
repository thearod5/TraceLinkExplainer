import { Dataset } from "../../../../../shared/Dataset";

export function createSearchOptionsForSourceArtifact(dataset: Dataset) {
  const ids: string[] = [];
  const bodies: string[] = [];
  console.log(dataset);
  for (
    let artifactIndex = 0;
    artifactIndex < dataset.artifacts.length;
    artifactIndex++
  ) {
    let artifact = dataset.artifacts[artifactIndex];
    ids.push(artifact.id);
    bodies.push(artifact.body);
  }

  return bodies.concat(ids);
}

export function createSearchOptionsForTargetArtifact(sourceArtifact: Artifact) {
  const ids: string[] = [];
  const bodies: string[] = [];

  return bodies.concat(ids);
}
