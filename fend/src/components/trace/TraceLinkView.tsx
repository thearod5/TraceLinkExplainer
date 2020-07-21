import React from "react";
import { useSelector } from "react-redux";
import SplitterLayout from "react-splitter-layout";
import styled from "styled-components";
import { Artifact } from "../../../../shared/Dataset";
import { RootState } from "../../redux";
import ArtifactDisplay from "../artifacts/ArtifactDisplay";

// TODO: Make trace line a symmetrical distance from each identifier label

export default function TraceLinkView() {
  const targetArtifact: Artifact = useSelector(
    (state: RootState) => state.metaData.targetArtifact
  );
  const sourceArtifact: Artifact = useSelector(
    (state: RootState) => state.metaData.sourceArtifact
  );

  return (
    <TraceLinkContainer>
      <SplitterLayout secondaryMinSize={20} primaryMinSize={20}>
        <ArtifactDisplay artifact={sourceArtifact} />
        <ArtifactDisplay artifact={targetArtifact} />
      </SplitterLayout>
    </TraceLinkContainer>
  );
}

const TraceLinkContainer = styled.div`
  width: 100%;
`;
