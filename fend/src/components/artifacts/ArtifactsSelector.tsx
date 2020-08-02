import React from "react";
import { useSelector } from "react-redux";
import SplitterLayout from "react-splitter-layout";
import styled from "styled-components";
import { Artifact } from "../../../../shared/Dataset";
import { RootState } from "../../redux";
import ArtifactDisplay from "./ArtifactDisplay";
import NoSourceMessage from "./NoSourceMessage";
import SourceArtifactSearch from "./source/SourceArtifactSearch";
import TargetArtifactSearch from "./target/TargetArtifactSearch";

interface ArtifactsProps {}

//TODO: Vertically center text asking to selecting a source

export default function ArtifactSelector(props: ArtifactsProps) {
  const sourceArtifact: Artifact = useSelector(
    (state: RootState) => state.metaData.sourceArtifact
  );
  const currentStep: number = useSelector(
    (state: RootState) => state.metaData.currentStep
  );

  const sourceIsSelected = currentStep === 2;
  const leftPanel = sourceIsSelected ? (
    <ArtifactDisplay
      words={[
        {
          family: "",
          word: sourceArtifact.body,
          weight: 0,
        },
      ]}
      artifactId={sourceArtifact.id}
      artifactType={sourceArtifact.type}
      familyColors={{}}
    />
  ) : (
    <SourceArtifactSearch />
  );
  const rightPanel = sourceIsSelected ? (
    <TargetArtifactSearch />
  ) : (
    <NoSourceMessage />
  );

  return (
    <ArtifactsContainer>
      <SplitterLayout
        percentage={true}
        secondaryInitialSize={50}
        secondaryMinSize={25}
        primaryMinSize={25}
      >
        {leftPanel}
        {rightPanel}
      </SplitterLayout>
    </ArtifactsContainer>
  );
}

const ArtifactsContainer = styled.div`
  padding: 10px;
`;
