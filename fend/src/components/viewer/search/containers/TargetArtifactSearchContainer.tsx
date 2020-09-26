import React from "react";
import { searchForTargetArtifact } from "../../../../api/search";
import { setSelectedTargets } from "../../../../redux/actions";
import { TRACE_VIEW_ROUTE } from "../../../constants";
import SearchController from "../SearchController";

interface TargetArtifactSearchProps { }

export default function TargetArtifactSearch(props: TargetArtifactSearchProps) {
  return (
    <SearchController
      searchFunction={searchForTargetArtifact}
      onArtifactsSelected={setSelectedTargets}
      nextPageLocation={TRACE_VIEW_ROUTE}
    />
  );
}
