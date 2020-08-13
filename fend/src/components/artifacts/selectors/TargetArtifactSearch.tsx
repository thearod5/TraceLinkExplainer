import React from "react";
import { searchForTargetArtifact } from "../../../api/search";
import {
  removeSelectedSource,
  setTargetArtifact,
} from "../../../redux/actions";
import Search from "../../search/Search";

interface TargetArtifactSearchProps {}

export default function TargetArtifactSearch(props: TargetArtifactSearchProps) {
  return (
    <Search
      searchFunction={searchForTargetArtifact} //TODO: Remove dummy functions after bend functionality
      onArtifactSelected={setTargetArtifact}
      onArtifactRemoved={removeSelectedSource}
    />
  );
}
