import { Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SplitterLayout from "react-splitter-layout";
import styled from "styled-components";
import {
  Artifact,
  Dataset,
  FamilyColors,
  TraceInformation,
} from "../../../../shared/Dataset";
import { getTraceInformation } from "../../api/trace";
import { RootState } from "../../redux";
import ArtifactDisplay from "../artifacts/ArtifactDisplay";

const colors = ["DarkSeaGreen", "CornFlowerBlue", "DarkSalmon"];

// TODO: Make trace line a symmetrical distance from each identifier label
function createFamilyColors(families: string[]): FamilyColors {
  const familyColors: FamilyColors = {};
  families.forEach((family, index) => {
    familyColors[family] = colors[index % colors.length];
  });
  return familyColors;
}

export default function TraceLinkView() {
  const dataset: Dataset = useSelector((state: RootState) => state.dataset);
  const targetArtifact: Artifact = useSelector(
    (state: RootState) => state.metaData.targetArtifact
  );
  const sourceArtifact: Artifact = useSelector(
    (state: RootState) => state.metaData.sourceArtifact
  );

  const [
    traceInformation,
    setTraceInformation,
  ] = useState<TraceInformation | null>(null);
  const [familyColors, setFamilyColors] = useState<FamilyColors | null>(null);

  useEffect(() => {
    getTraceInformation("Drone", sourceArtifact, targetArtifact)
      .then((traceInformation) => {
        const familyColors = createFamilyColors(traceInformation.families);
        setFamilyColors(familyColors);
        setTraceInformation(traceInformation);
      })
      .catch((e) => console.error(e));
  }, []);

  console.log("Dataset: ", dataset);
  console.log(traceInformation);

  return (
    <TraceLinkContainer container item>
      {traceInformation === null || familyColors === null ? (
        <p>Loading</p>
      ) : (
        <SplitterLayout secondaryMinSize={20} primaryMinSize={20}>
          <ArtifactDisplay
            words={traceInformation.sourceWords}
            artifactId={sourceArtifact.id}
            artifactType={sourceArtifact.type}
            familyColors={familyColors}
          />
          <ArtifactDisplay
            words={traceInformation.targetWords}
            artifactId={targetArtifact.id}
            artifactType={targetArtifact.type}
            familyColors={familyColors}
          />
        </SplitterLayout>
      )}
    </TraceLinkContainer>
  );
}

const TraceLinkContainer = styled(Grid)`
  width: 100%;
`;

const ViewSplitterContainer = styled.div`
  justify-content: center;
  align-items: flex-start;
  overflow: scroll;
`;
