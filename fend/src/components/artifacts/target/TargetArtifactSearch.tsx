import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Artifact, Dataset } from "../../../../../shared/Dataset";
import { searchForTargetArtifact } from "../../../api/search";
import { RootState } from "../../../redux";
import { setTargetArtifact } from "../../../redux/actions";
import { createSearchOptionsForTargetArtifact } from "../../search/filtering/searchOptionsCreator";
import Search from "../../search/Search";

interface TargetArtifactSearchProps {}

export default function TargetArtifactSearch(props: TargetArtifactSearchProps) {
  const dataset: Dataset = useSelector((state: RootState) => state.dataset);
  const sourceArtifact: Artifact = useSelector(
    (state: RootState) => state.metaData.sourceArtifact
  );

  return (
    <TargetArtifactContainer>
      <Search
        searchFunction={searchForTargetArtifact} //TODO: Remove dummy functions after bend functionality
        getSearchOptions={(selectedIndex: number) =>
          createSearchOptionsForTargetArtifact(
            dataset,
            sourceArtifact,
            selectedIndex
          )
        }
        dispatchEvent={setTargetArtifact}
      />
    </TargetArtifactContainer>
  );
}

const TargetArtifactContainer = styled.div``;
