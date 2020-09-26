import React from "react";
import { createDefaultWordDescriptors, getDefaultFamilies, getDefaultFamilyColors } from "../../../shared/artifacts/WordCreator";
import { Artifact, ArtifactIdentifier } from "../../../shared/types/Dataset";
import { RelationshipColors, Relationships, WordDescriptors } from "../../../shared/types/Trace";
import { colors } from "../../constants";
import ArtifactAccordion from "./ArtifactAccordion";

export function getDefaultArtifactDisplay(
  artifact: ArtifactIdentifier,
  wordDescriptors: WordDescriptors,
  expanded: boolean,
  onExpand: () => void,
  onShrink: () => void,
) {
  return (
    <ArtifactAccordion
      key={`${artifact.type}:${artifact.id}`}
      artifactId={artifact.id}
      artifactType={artifact.type}
      wordDescriptors={wordDescriptors}
      relationships={getDefaultFamilies()}
      relationshipColors={getDefaultFamilyColors()}
      expanded={expanded}
      onExpand={onExpand}
      onShrink={onShrink}
    />
  );
}

function getTraceArtifactDisplay(
  wordDescriptors: WordDescriptors,
  families: Relationships,
  artifact: Artifact,
  familyColors: RelationshipColors,
  expanded: boolean,
  onExpand: () => void,
  onShrink: () => void,
) {
  return (
    <ArtifactAccordion
      key={`${artifact.type}:${artifact.id}`}
      artifactId={artifact.id}
      artifactType={artifact.type}
      wordDescriptors={wordDescriptors}
      relationships={families}
      relationshipColors={familyColors}
      expanded={expanded}
      onExpand={onExpand}
      onShrink={onShrink}
    />
  );
}


export function createTraceArtifactDisplays(
  artifacts: Artifact[],
  families: Relationships,
  selectedIndex: number,
  traceWords: WordDescriptors,
  familyColors: Record<string, string>,
  setIndex: (index: number) => void,
) {
  return (
    <div className="heightFull overflowScroll"> {
      artifacts.map((artifact, index) => {
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
            () => setIndex(-1));
        }
      })
    }
    </div>);
}

/*
 * Factory utilities functions
 */

export function createFamilyColors(familyIds: string[]): RelationshipColors {
  const familyColors: RelationshipColors = {};
  familyIds.forEach((family, index) => {
    familyColors[family] = colors[index % colors.length];
  });
  return familyColors;
}
