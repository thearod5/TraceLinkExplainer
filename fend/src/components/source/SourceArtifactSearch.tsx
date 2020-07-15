import React from "react";
import { useSelector } from "react-redux";
import { searchForSourceArtifact } from "../../api/search";
import { RootState } from "../../redux";
import { setSourceArtifact } from "../../redux/actions";
import { TARGET_ARTIFACT_ROUTE } from "../nav/routes";
import { createSearchOptionsForSourceArtifact } from "../search/filtering/searchOptionsCreator";
import Search from "../search/Search";

export default function TargetArtifactSearch() {
  const dataset = useSelector((state: RootState) => state.dataset);

  return (
    <Search
      searchFunction={searchForSourceArtifact}
      getSearchOptions={(selectedIndex: number) =>
        createSearchOptionsForSourceArtifact(dataset, selectedIndex)
      }
      searchItemResultPage={TARGET_ARTIFACT_ROUTE}
      dispatchEvent={setSourceArtifact}
    />
  );
}
