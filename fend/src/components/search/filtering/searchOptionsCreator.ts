import { Artifact, Dataset, SearchItem } from "../../../../../shared/Dataset";
import { TabKeys } from "../tabbar/types";

type CountDictionary = Record<string, number>;

export function getNumberOfResults(results: SearchItem[]): number[] {
  const tabCounts: CountDictionary = initializeSearchResultCounts();
  for (let resultIndex = 0; resultIndex < results.length; resultIndex++) {
    let searchResult: SearchItem = results[resultIndex];
    let searchType = searchResult.artifact.type;
    tabCounts[searchType] = tabCounts[searchType] + 1;
  }
  tabCounts[TabKeys[0]] = results.length;
  return Object.values(tabCounts);
}

function initializeSearchResultCounts(): CountDictionary {
  const counts: Record<string, number> = {};
  for (let tabKeyIndex = 0; tabKeyIndex < TabKeys.length; tabKeyIndex++) {
    const tabKeyName: string = TabKeys[tabKeyIndex];
    counts[tabKeyName] = 0;
  }
  return counts;
}

export function createSearchOptionsForSourceArtifact(
  dataset: Dataset,
  selectedIndex: number
) {
  const ids: string[] = [];
  const bodies: string[] = [];
  const artifactType = TabKeys[selectedIndex];
  for (
    let artifactIndex = 0;
    artifactIndex < dataset.artifacts.length;
    artifactIndex++
  ) {
    let artifact = dataset.artifacts[artifactIndex];
    if (artifactType === "All" || artifactType === artifact.type) {
      // TODO: ids.push(artifact.id);
      bodies.push(artifact.body);
    }
  }

  return bodies.concat(ids);
}

export function createSearchOptionsForTargetArtifact(
  dataset: Dataset,
  sourceArtifact: Artifact,
  selectedIndex: number
) {
  const ids: string[] = [];
  const bodies: string[] = [];

  return bodies.concat(ids);
}
