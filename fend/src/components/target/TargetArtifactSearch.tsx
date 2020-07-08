import React from "react";
import { useSelector } from "react-redux";
import SplitterLayout from "react-splitter-layout";
import styled from "styled-components";
import { Artifact } from "../../../../shared/Dataset";
import { searchForTargetArtifact } from "../../api/search";
import { RootState } from "../../redux";
import { setTargetArtifact } from "../../redux/actions";
import { TRACE_VIEW_ROUTE } from "../nav/routes";
import { createSearchOptionsForTargetArtifact } from "../search/filtering/searchOptionsCreator";
import Search from "../search/Search";
import ArtifactDisplay from "./ArtifactDisplay";

interface TargetArtifactSearchProps {}

export default function TargetArtifactSearch(props: TargetArtifactSearchProps) {
  const sourceArtifact: Artifact = useSelector(
    (state: RootState) => state.metaData.sourceArtifact
  );
  const searchOptions = createSearchOptionsForTargetArtifact(sourceArtifact);

  return (
    <TargetArtifactContainer>
      <SplitterLayout
        percentage={true}
        secondaryInitialSize={50}
        secondaryMinSize={25}
      >
        <ArtifactDisplay artifact={sourceArtifact} />
        <Search
          searchFunction={searchForTargetArtifact} //TODO: Remove dummy functions after bend functionality
          searchOptions={searchOptions}
          searchItemResultPage={TRACE_VIEW_ROUTE}
          dispatchEvent={setTargetArtifact}
        />
      </SplitterLayout>
    </TargetArtifactContainer>
  );
}

const TargetArtifactContainer = styled.div``;
