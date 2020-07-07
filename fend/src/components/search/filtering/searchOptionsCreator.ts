export function createSearchOptionsForSourceArtifact(dataset: Dataset) {
  const ids: string[] = [];
  const bodies: string[] = [];

  for (
    let artifactSetIndex = 0;
    artifactSetIndex < dataset.artifactSets.length;
    artifactSetIndex++
  ) {
    let artifactSet = dataset.artifactSets[artifactSetIndex];

    for (
      let artifactIndex = 0;
      artifactIndex < artifactSet.artifacts.length;
      artifactIndex++
    ) {
      let artifact = artifactSet.artifacts[artifactIndex];
      ids.push(artifact.id);
      bodies.push(artifact.body);
    }
  }

  return bodies.concat(ids);
}
