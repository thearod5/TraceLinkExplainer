import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SplitPane from "react-split-pane";
import styled from "styled-components";
import { getTraceInformation } from "../../api/trace";
import {
  getCurrentStep,
  getSelectedSources,
  getSelectedTargets,
} from "../../redux/selectors";
import {
  createDefaultWordDescriptors,
  getDefaultFamilyColors,
} from "../../shared/artifacts/WordCreator";
import {
  SELECT_SOURCE_STEP,
  SELECT_TARGET_STEP,
  VIEW_TRACE_STEP,
} from "../../shared/pagechanger/constants";
import { Artifact, ArtifactIdentifier } from "../../shared/types/Dataset";
import { FamilyColors, WordDescriptors } from "../../shared/types/Trace";
import NoSourceMessage from "./NoSourceMessage";
import ArtifactDisplayController from "./selectors/display/ArtifactDisplayController";
import SourceArtifactSearch from "./selectors/SourceArtifactSearch";
import TargetArtifactSearch from "./selectors/TargetArtifactSearch";

const colors = ["DarkSeaGreen", "CornFlowerBlue", "DarkSalmon"]; //TODO: Add to theme

//createDefaultWords(artifact.body)
export function getDefaultArtifactDisplay(
  artifact: ArtifactIdentifier,
  words: WordDescriptors,
  showToolbar = true
) {
  return (
    <ArtifactDisplayController
      words={words}
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
    <ArtifactDisplayController
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
  const selectedSources: Artifact[] = useSelector(getSelectedSources);
  const selectedTargets: Artifact[] = useSelector(getSelectedTargets);
  const currentStep: number = useSelector(getCurrentStep);
  const [leftPanel, setLeftPanel] = useState<JSX.Element | null>(null);
  const [rightPanel, setRightPanel] = useState<JSX.Element | null>(null);

  const sourceArtifact = selectedSources[0];
  const targetArtifact = selectedTargets[0];

  useEffect(() => {
    switch (currentStep) {
      case SELECT_SOURCE_STEP:
        setLeftPanel(<SourceArtifactSearch />);
        setRightPanel(<NoSourceMessage />);
        break;
      case SELECT_TARGET_STEP:
        setLeftPanel(
          getDefaultArtifactDisplay(
            sourceArtifact,
            createDefaultWordDescriptors(sourceArtifact.body)
          )
        );
        setRightPanel(<TargetArtifactSearch />);
        break;
      case VIEW_TRACE_STEP:
        getTraceInformation("Drone", sourceArtifact, targetArtifact) // change with state index
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
        throw Error(
          "Expected state to be at least step 1. Give: " + currentStep
        );
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
  padding: 0px;
`;
