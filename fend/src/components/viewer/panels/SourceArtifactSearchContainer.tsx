import React from "react";
import { searchForSourceArtifact } from "../../../api/search";
import { setSelectedSources } from "../../../redux/actions";
import { SELECT_TARGET_ARTIFACTS } from "../../constants";
import SearchController from "../search/SearchController";

export default function SourceArtifactSearch() {
  return (
    <SearchController
      searchFunction={searchForSourceArtifact}
      onArtifactsSelected={setSelectedSources}
      nextPageLocation={SELECT_TARGET_ARTIFACTS}
    />
  );
}
