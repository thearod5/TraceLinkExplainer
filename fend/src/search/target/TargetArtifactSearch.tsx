import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Artifact, Dataset } from "../../../../shared/Dataset";
import { RootState } from "../../redux";
import Search, { SearchResult, SearchSet } from "../common/Search";

const dummyArtifact: Artifact = {
  id: "RE-8",
  body: "UAV State transitions when requested the...",
};

const dummySearchResult: SearchResult = {
  artifact: dummyArtifact,
  similarity: 0.5,
};
const dummySearchSet: SearchSet = {
  results: [dummySearchResult],
  type: "Requirements",
};

function dummyRecommendationFunction(
  query: string,
  relatedToArtifact?: Artifact
): [string] {
  return ["RE-8"];
}
function dummySearchFunction(
  query: string,
  relatedToArtifact?: Artifact
): [SearchSet] {
  return [dummySearchSet];
}

function createSearchOptions(dataset: Dataset) {
  const ids: string[] = [];
  const bodies: string[] = [];

  dataset.artifactSets.map((artifactSet) => {
    artifactSet.artifacts.map((artifact) => {
      ids.push(artifact.id);
      bodies.push(artifact.body);
    });
  });
  return bodies.concat(ids);
}

export default function TargetArtifactSearch() {
  const history = useHistory();

  const dataset = useSelector((state: RootState) => state.dataset);
  const searchOptions = createSearchOptions(dataset);

  useEffect(() => (dataset.name === "" ? history.push("/") : undefined), []);

  return (
    <Search
      searchFunction={dummySearchFunction}
      suggestionFunction={dummyRecommendationFunction}
      searchOptions={searchOptions}
    />
  );
}
