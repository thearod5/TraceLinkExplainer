import React from "react";
import { searchForSourceArtifact } from "../api/search";
import { SELECT_TARGETS_ROUTE } from "../constants";
import SearchController from "../components/search/SearchController";
import { setSelectedSources } from "../redux/actions";

export default function SourceArtifactSearch() {
  return (
    <SearchController
      searchFunction={searchForSourceArtifact}
      onArtifactsSelected={setSelectedSources}
      nextPageLocation={SELECT_TARGETS_ROUTE}
    />
  );
}
