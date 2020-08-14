import React from "react";
import { searchForSourceArtifact } from "../../../api/search";
import { setSelectedSources } from "../../../redux/actions";
import Search from "../../search/Search";

export default function SourceArtifactSearch() {
  return (
    <Search
      searchFunction={searchForSourceArtifact}
      onArtifactsSelected={setSelectedSources}
    />
  );
}
