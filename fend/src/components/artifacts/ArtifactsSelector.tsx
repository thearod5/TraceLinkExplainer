import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SplitterLayout from "react-splitter-layout";
import styled from "styled-components";
import {
  Artifact,
  FamilyColors,
  WordDescriptors,
} from "../../../../shared/Dataset";
import { getTraceInformation } from "../../api/trace";
import {
  getCurrentStep,
  getSourceArtifact,
  getTargetArtifact,
} from "../../redux/selectors";
import {
  SELECT_SOURCE_STEP,
  SELECT_TARGET_STEP,
  VIEW_TRACE_STEP,
} from "../../redux/stepmanager/constants";
import ArtifactDisplay from "./ArtifactDisplay";
import NoSourceMessage from "./NoSourceMessage";
import SourceArtifactSearch from "./source/SourceArtifactSearch";
import TargetArtifactSearch from "./target/TargetArtifactSearch";

const colors = ["DarkSeaGreen", "CornFlowerBlue", "DarkSalmon"]; //TODO: Add to theme

function getDefaultArtifactDisplay(artifact: Artifact) {
  return (
    <ArtifactDisplay
      words={[
        {
          family: "",
          word: artifact.body,
          weight: 0,
        },
      ]}
      artifactId={artifact.id}
      artifactType={artifact.type}
      familyColors={{}}
    />
  );
}

function getTraceArtifactDisplay(
  artifactWords: WordDescriptors,
  artifact: Artifact,
  familyColors: FamilyColors
) {
  return (
    <ArtifactDisplay
      words={artifactWords}
      artifactId={artifact.id}
      artifactType={artifact.type}
      familyColors={familyColors}
    />
  );
}

function createFamilyColors(families: string[]): FamilyColors {
  const familyColors: FamilyColors = {};
  families.forEach((family, index) => {
    familyColors[family] = colors[index % colors.length];
  });
  return familyColors;
}

//TODO: Vertically center text asking to selecting a source

export default function ArtifactSelector() {
  const sourceArtifact: Artifact = useSelector(getSourceArtifact);
  const targetArtifact: Artifact = useSelector(getTargetArtifact);
  const currentStep: number = useSelector(getCurrentStep);
  const [leftPanel, setLeftPanel] = useState<JSX.Element | null>(null);
  const [rightPanel, setRightPanel] = useState<JSX.Element | null>(null);

  console.log("current step: ", currentStep);
  useEffect(() => {
    switch (currentStep) {
      case SELECT_SOURCE_STEP:
        console.log("setting state to SELECT_SOURCE");
        setLeftPanel(<SourceArtifactSearch />);
        setRightPanel(<NoSourceMessage />);
        break;
      case SELECT_TARGET_STEP:
        console.log("setting state to SELECT_TARGET");
        setLeftPanel(getDefaultArtifactDisplay(sourceArtifact));
        setRightPanel(<TargetArtifactSearch />);
        break;
      case VIEW_TRACE_STEP:
        console.log("setting state to VIEW_TRACE");
        getTraceInformation("Drone", sourceArtifact, targetArtifact)
          .then((traceInformation) => {
            const familyColors = createFamilyColors(traceInformation.families);

            setLeftPanel(
              getTraceArtifactDisplay(
                traceInformation.sourceWords,
                sourceArtifact,
                familyColors
              )
            );
            setRightPanel(
              getTraceArtifactDisplay(
                traceInformation.targetWords,
                targetArtifact,
                familyColors
              )
            );
          })
          .catch((e) => console.error(e));
        break;
      default:
        setLeftPanel(<NoSourceMessage />);
        setRightPanel(<NoSourceMessage />);
        break;
    }
  }, [currentStep]);

  return (
    <ArtifactsContainer>
      <SplitterContainer
        percentage={true}
        secondaryInitialSize={50}
        secondaryMinSize={25}
        primaryMinSize={25}
      >
        {leftPanel}
        {rightPanel}
      </SplitterContainer>
    </ArtifactsContainer>
  );
}

const ArtifactsContainer = styled.div`
  padding: 10px;
`;

const SplitterContainer = styled(SplitterLayout)`
  border: 3px solid blue;
`;
