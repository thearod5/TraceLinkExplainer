import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux";
import { TARGET_ARTIFACT_ROUTE } from "../nav/routes";
import { createSearchOptionsForSourceArtifact } from "../search/filtering/searchOptionsCreator";
import Search from "../search/Search";
import { dummyRecommendationFunction, dummySearchFunction } from "./DummyData";

export default function TargetArtifactSearch() {
  const dataset = useSelector((state: RootState) => state.dataset);
  const searchOptions = createSearchOptionsForSourceArtifact(dataset);

  return (
    <Search
      searchFunction={dummySearchFunction}
      suggestionFunction={dummyRecommendationFunction}
      searchOptions={searchOptions}
      searchItemResultPage={TARGET_ARTIFACT_ROUTE}
    />
  );
}
