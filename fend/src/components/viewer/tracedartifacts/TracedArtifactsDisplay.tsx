import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedSourceIndex, setSelectedTargetIndex } from "../../../redux/actions";
import { getSelectedSourceIndex, getSelectedTargetIndex } from "../../../redux/selectors";
import { createDefaultWordDescriptors, getDefaultFamilies, getDefaultFamilyColors } from "../../../shared/artifacts/WordCreator";
import { Artifact, ArtifactIdentifier } from "../../../shared/types/Dataset";
import { RelationshipColors, Relationships, WordDescriptors } from "../../../shared/types/Trace";
import { colors } from "../../constants";
import ArtifactAccordion from "../accordion/ArtifactAccordion";

//TODO: Extract this into component (TracedArtifactAccordions)

interface TracedArtifactAccordionDisplayProps {
  type: "SOURCE" | "TARGET",
  artifacts: Artifact[],
  traceWords: WordDescriptors,
  relationships: Relationships,
  relationshipColors: Record<string, string>,
}

export function TracedArtifactDisplay(props: TracedArtifactAccordionDisplayProps) {
  const { type, artifacts, relationships: families, traceWords, relationshipColors: familyColors } = props
  const index = type === "SOURCE" ? 0 : 1
  const selectors = [getSelectedSourceIndex, getSelectedTargetIndex]
  const setters = [setSelectedSourceIndex, setSelectedTargetIndex]
  const selectedIndex = useSelector(selectors[index])
  const dispatch = useDispatch()

  const onSetIndex = (artifactIndex: number) => dispatch(setters[index](artifactIndex))

  return (
    <div className="heightFull overflowScroll"> {
      artifacts.map((artifact, index) => {
        if (index === selectedIndex) {
          return createTracedArtifactAccordion(
            traceWords,
            families,
            artifact,
            familyColors,
            true,
            () => onSetIndex(index),
            () => onSetIndex(-1)
          );
        } else {
          return createDefaultArtifactAccordion(
            artifact,
            createDefaultWordDescriptors(artifact.body),
            false,
            () => onSetIndex(index),
            () => onSetIndex(-1));
        }
      })
    }
    </div>);
}
export function createDefaultArtifactAccordion(
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

function createTracedArtifactAccordion(
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
