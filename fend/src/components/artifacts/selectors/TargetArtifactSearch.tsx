import React from "react";
import { searchForTargetArtifact } from "../../../api/search";
import { setSelectedTargets } from "../../../redux/actions";
import SearchController from "../../search/SearchController";

interface TargetArtifactSearchProps {}

export default function TargetArtifactSearch(props: TargetArtifactSearchProps) {
  return (
    <SearchController
      searchFunction={searchForTargetArtifact}
      onArtifactsSelected={setSelectedTargets}
    />
  );
}
