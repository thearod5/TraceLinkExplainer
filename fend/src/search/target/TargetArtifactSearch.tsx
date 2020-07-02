import React from "react";
import { Artifact } from "../../../../shared/Dataset";
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

export default function TargetArtifactSearch() {
  return (
    <Search
      searchFunction={dummySearchFunction}
      recommendationFunction={dummyRecommendationFunction}
    />
  );
}
