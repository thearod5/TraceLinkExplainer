import React from "react";
import { createDefaultWordDescriptors, getDefaultFamilies, getDefaultFamilyColors } from "../../shared/artifacts/WordCreator";
import { Artifact, ArtifactIdentifier } from "../../shared/types/Dataset";
import { Families, FamilyColors, WordDescriptors } from "../../shared/types/Trace";
import ArtifactDisplayController from "./display/ArtifactDisplayController";

export const colors = ["CornFlowerBlue", "DarkSeaGreen", "DarkSalmon", "Khaki", "BlueViolet", "FireBrick", "LightGreen", "Maroon",
  "DeepSkyBlue", "MediumOrchid", "Olive", "SpringGreen"]; //TODO: Add to theme


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
      artifactId={artifact.id}
      artifactType={artifact.type}
      words={words}
      families={getDefaultFamilies()}
      familyColors={getDefaultFamilyColors()}
      expanded={expanded}
      onExpand={onExpand}
      onShrink={onShrink}
    />
  );
}

function getTraceArtifactDisplay(
  artifactWords: WordDescriptors,
  families: Families,
  artifact: Artifact,
  familyColors: FamilyColors,
  expanded: boolean,
  onExpand: () => void,
  onShrink: () => void
) {
  return (
    <ArtifactDisplayController
      key={`${artifact.type}:${artifact.id}`}
      artifactId={artifact.id}
      artifactType={artifact.type}
      words={artifactWords}
      families={families}
      familyColors={familyColors}
      expanded={expanded}
      onExpand={onExpand}
      onShrink={onShrink} />
  );
}
export function createFamilyColors(familyIds: string[]): FamilyColors {
  const familyColors: FamilyColors = {};
  familyIds.forEach((family, index) => {
    familyColors[family] = colors[index % colors.length];
  });
  return familyColors;
}

export function createTraceArtifactDisplays(
  artifacts: Artifact[],
  families: Families,
  selectedIndex: number,
  traceWords: WordDescriptors,
  familyColors: Record<string, string>,
  setIndex: (index: number) => void) {
  return <div className="heightFull overflowScroll">
    {artifacts.map((artifact, index) => {
      if (index === selectedIndex) {
        return getTraceArtifactDisplay(
          traceWords,
          families,
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
