import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SplitPane from "react-split-pane";
import styled from "styled-components";
import { getTraceInformation } from "../../api/trace";
import {
  getCurrentStep,
  getSourceArtifact,
  getTargetArtifact,
} from "../../redux/selectors";
import {
  createDefaultWords,
  getDefaultFamilyColors,
} from "../../shared/artifacts/WordCreator";
import {
  SELECT_SOURCE_STEP,
  SELECT_TARGET_STEP,
  VIEW_TRACE_STEP,
} from "../../shared/pagechanger/constants";
import { Artifact } from "../../shared/types/Dataset";
import { FamilyColors, WordDescriptors } from "../../shared/types/Trace";
import NoSourceMessage from "./NoSourceMessage";
import ArtifactDisplay from "./selectors/display/ArtifactDisplay";
import SourceArtifactSearch from "./selectors/SourceArtifactSearch";
import TargetArtifactSearch from "./selectors/TargetArtifactSearch";

const colors = ["DarkSeaGreen", "CornFlowerBlue", "DarkSalmon"]; //TODO: Add to theme

export function getDefaultArtifactDisplay(
  artifact: Artifact,
  showToolbar = true
) {
  return (
    <ArtifactDisplay
      words={createDefaultWords(artifact.body)}
      artifactId={artifact.id}
      artifactType={artifact.type}
      familyColors={getDefaultFamilyColors()}
      showToolbar={showToolbar}
    />
  );
}

function getTraceArtifactDisplay(
  artifactWords: WordDescriptors,
  artifact: Artifact,
  familyColors: FamilyColors,
  showToolbar = true
) {
  return (
    <ArtifactDisplay
      words={artifactWords}
      artifactId={artifact.id}
      artifactType={artifact.type}
      familyColors={familyColors}
      showToolbar={showToolbar}
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

export default function ArtifactSelector() {
  const sourceArtifact: Artifact = useSelector(getSourceArtifact);
  const targetArtifact: Artifact = useSelector(getTargetArtifact);
  const currentStep: number = useSelector(getCurrentStep);
  const [leftPanel, setLeftPanel] = useState<JSX.Element | null>(null);
  const [rightPanel, setRightPanel] = useState<JSX.Element | null>(null);

  useEffect(() => {
    switch (currentStep) {
      case SELECT_SOURCE_STEP:
        setLeftPanel(<SourceArtifactSearch />);
        setRightPanel(<NoSourceMessage />);
        break;
      case SELECT_TARGET_STEP:
        setLeftPanel(getDefaultArtifactDisplay(sourceArtifact));
        setRightPanel(<TargetArtifactSearch />);
        break;
      case VIEW_TRACE_STEP:
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
  }, [currentStep, sourceArtifact, targetArtifact]);

  return (
    <ArtifactsContainer>
      <SplitPane split="vertical">
        {leftPanel}
        {rightPanel}
      </SplitPane>
    </ArtifactsContainer>
  );
}

const ArtifactsContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: hidden;
`;
