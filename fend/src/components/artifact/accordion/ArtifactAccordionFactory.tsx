import React from 'react'
import { colors } from '../../../types/constants'
import { createDefaultWordDescriptors, getDefaultRelationshipColors, getDefaultRelationships } from '../words/WordCreator'
import { Artifact, ArtifactIdentifier } from '../../../types/Project'
import { RelationshipColors, Relationships, WordDescriptors } from '../../../types/Trace'
import ArtifactAccordion from './ArtifactAccordion'

export function createTraceExplanationAccordion (
  wordDescriptors: WordDescriptors | null,
  relationships: Relationships | null,
  artifact: Artifact,
  relationshipColors: RelationshipColors | null,
  expanded: boolean,
  onExpand: () => void,
  onShrink: () => void,
  isLoading: boolean
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
      isLoading={isLoading}
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
      isLoading={false}
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
