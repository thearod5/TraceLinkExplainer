import React from "react";
import { searchForSourceArtifact } from "../../../api/search";
import {
  removeSelectedSource,
  setSourceArtifact,
} from "../../../redux/actions";
import Search from "../../search/Search";

export default function SourceArtifactSearch() {
  return (
    <Search
      searchFunction={searchForSourceArtifact}
      onArtifactSelected={setSourceArtifact}
      onArtifactRemoved={removeSelectedSource}
    />
  );
}
