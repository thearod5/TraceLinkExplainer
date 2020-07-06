import React from "react";
import { useSelector } from "react-redux";
import { Artifact, Dataset } from "../../../../shared/Dataset";
import { RootState } from "../../redux";
import Search from "../common/Search";
import { SearchItem, SearchResults } from "../common/types";

const dummyDesign: Artifact = {
  id: "DD-16",
  body: "...place holder for design document...",
};

const dummyDesignSearchItem: SearchItem = {
  artifact: dummyDesign,
  similarity: 0.4,
};

const dummyDesignSearch: SearchResults = {
  items: [dummyDesignSearchItem],
  type: "Designs",
};

/*
 * Requirements
 */

const dummyRequirement: Artifact = {
  id: "RE-8",
  body: "UAV State transitions when requested the...",
};

const dummyRequirementSearchitem: SearchItem = {
  artifact: dummyRequirement,
  similarity: 0.5,
};
const dummyRequirementSearch: SearchResults = {
  items: [dummyRequirementSearchitem],
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
): SearchResults[] {
  return [dummyRequirementSearch, dummyDesignSearch];
}

function createSearchOptions(dataset: Dataset) {
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

export default function TargetArtifactSearch() {
  const dataset = useSelector((state: RootState) => state.dataset);
  const searchOptions = createSearchOptions(dataset);

  return (
    <Search
      searchFunction={dummySearchFunction}
      suggestionFunction={dummyRecommendationFunction}
      searchOptions={searchOptions}
    />
  );
}
