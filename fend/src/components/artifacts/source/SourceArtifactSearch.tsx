import React from "react";
import { searchForSourceArtifact } from "../../../api/search";
import { setSourceArtifact } from "../../../redux/actions";
import Search from "../../search/Search";

export default function SourceArtifactSearch() {
  return (
    <Search
      searchFunction={searchForSourceArtifact}
      dispatchEvent={setSourceArtifact}
    />
  );
}
