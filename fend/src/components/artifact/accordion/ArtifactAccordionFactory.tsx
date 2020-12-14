import React from 'react'
import { createDefaultWordDescriptors, getDefaultRelationshipColors, getDefaultRelationships } from '../../../operations/artifacts/WordCreator'
import { Artifact, ArtifactIdentifier } from '../../../operations/types/Dataset'
import { RelationshipColors, Relationships, WordDescriptors } from '../../../operations/types/Trace'
import { colors } from '../../../constants'
import ArtifactAccordion from './ArtifactAccordion'

export function createTracedArtifactAccordion (
  wordDescriptors: WordDescriptors | null,
  relationships: Relationships | null,
  artifact: Artifact,
  relationshipColors: RelationshipColors | null,
  expanded: boolean,
  onExpand: () => void,
  onShrink: () => void
) {
  return (
    <ArtifactAccordion
      key={`${artifact.type}:${artifact.name}`}
      artifactId={artifact.name}
      artifactType={artifact.type}
      wordDescriptors={wordDescriptors}
      relationships={relationships}
      relationshipColors={relationshipColors}
      expanded={expanded}
      onExpand={onExpand}
      onShrink={onShrink}
    />
  )
}

export function createDefaultArtifactAccordion (
  artifact: ArtifactIdentifier,
  artifactBody: string,
  expanded: boolean,
  onExpand: () => void,
  onShrink: () => void
) {
  return (
    <ArtifactAccordion
      key={`${artifact.type}:${artifact.name}`}
      artifactId={artifact.name}
      artifactType={artifact.type}
      wordDescriptors={createDefaultWordDescriptors(artifactBody)}
      relationships={getDefaultRelationships()}
      relationshipColors={getDefaultRelationshipColors()}
      expanded={expanded}
      onExpand={onExpand}
      onShrink={onShrink}
    />
  )
}
/*
 * Factory utilities functions
 */

export function createRelationshipColors (relationshipIds: string[]): RelationshipColors {
  const relationshipColors: RelationshipColors = {}
  relationshipIds.forEach((relationshipId, index) => {
    relationshipColors[relationshipId] = colors[index % colors.length]
  })
  return relationshipColors
}
