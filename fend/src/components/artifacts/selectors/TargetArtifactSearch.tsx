import React from "react";
import { searchForTargetArtifact } from "../../../api/search";
import { setSelectedTargets } from "../../../redux/actions";
import Search from "../../search/Search";

interface TargetArtifactSearchProps {}

export default function TargetArtifactSearch(props: TargetArtifactSearchProps) {
  return (
    <Search
      searchFunction={searchForTargetArtifact}
      onArtifactsSelected={setSelectedTargets}
    />
  );
}
