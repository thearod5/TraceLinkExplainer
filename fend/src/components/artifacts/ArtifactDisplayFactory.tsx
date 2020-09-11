import React from "react";
import { createDefaultWordDescriptors, getDefaultFamilyColors } from "../../shared/artifacts/WordCreator";
import { Artifact, ArtifactIdentifier } from "../../shared/types/Dataset";
import { FamilyColors, WordDescriptors } from "../../shared/types/Trace";
import ArtifactDisplayController from "./display/ArtifactDisplayController";

export const colors = ["CornFlowerBlue", "DarkSeaGreen", "BlueViolet", "DarkSalmon"]; //TODO: Add to theme


export function getDefaultArtifactDisplay(
  artifact: ArtifactIdentifier,
  words: WordDescriptors,
  expanded: boolean,
  onExpand: () => void,
  onShrink: () => void
) {
  return (
    <ArtifactDisplayController
      key={`${artifact.type}:${artifact.id}`}
      words={words}
      artifactId={artifact.id}
      artifactType={artifact.type}
      familyColors={getDefaultFamilyColors()}
      expanded={expanded}
      onExpand={onExpand}
      onShrink={onShrink}
    />
  );
}

function getTraceArtifactDisplay(
  artifactWords: WordDescriptors,
  artifact: Artifact,
  familyColors: FamilyColors,
  expanded: boolean,
  onExpand: () => void,
  onShrink: () => void
) {
  return (
    <ArtifactDisplayController
      key={`${artifact.type}:${artifact.id}`}
      words={artifactWords}
      artifactId={artifact.id}
      artifactType={artifact.type}
      familyColors={familyColors}
      expanded={expanded}
      onExpand={onExpand}
      onShrink={onShrink} />
  );
}
export function createFamilyColors(families: string[]): FamilyColors {
  const familyColors: FamilyColors = {};
  families.forEach((family, index) => {
    familyColors[family] = colors[index % colors.length];
  });
  return familyColors;
}
export function createTraceArtifactDisplays(
  artifacts: Artifact[],
  selectedIndex: number,
  traceWords: WordDescriptors,
  familyColors: Record<string, string>,
  setIndex: (index: number) => void) {
  return <div className="heightFull overflowScroll">
    {artifacts.map((artifact, index) => {
      if (index === selectedIndex) {
        return getTraceArtifactDisplay(
          traceWords,
          artifact,
          familyColors,
          true,
          () => setIndex(index),
          () => setIndex(-1)
        );
      } else {
        return getDefaultArtifactDisplay(
          artifact,
          createDefaultWordDescriptors(artifact.body),
          false,
          () => setIndex(index),
          () => setIndex(-1)
        );
      }
    })}</div>;
}
