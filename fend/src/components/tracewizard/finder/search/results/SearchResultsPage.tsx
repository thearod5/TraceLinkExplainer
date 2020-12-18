import React from 'react'
import { NUMBER_RESULTS_PROMPT } from '../../../../../constants'
import { getDefaultRelationships } from '../../../../../operations/artifacts/WordCreator'
import { Artifact } from '../../../../../operations/types/Project'
import { ArtifactClickAction } from '../types'
import SearchArtifactAccordion from './SearchResultAccordion'

interface SearchResultsProps {
  resultsSlice: Artifact[];
  numberOfTotalResults: number;
  onSelectArtifact: ArtifactClickAction;
  onRemoveArtifact: ArtifactClickAction;
}

export default function SearchResultsPage (props: SearchResultsProps) {
  const { resultsSlice: results, numberOfTotalResults, onSelectArtifact, onRemoveArtifact } = props
  return (
    <div className="sizeFull flexColumn overflowYScroll">
      <label className="padVerticalLight widthFull textAlignCenter">
        {numberOfTotalResults + NUMBER_RESULTS_PROMPT}
      </label>
      {results.map((searchItem) => {
        return (
          <SearchArtifactAccordion
            key={searchItem.name}
            artifact={searchItem}
            families={getDefaultRelationships()} // this is what differiates from trace artifact accordion
            onSelectArtifact={onSelectArtifact}
            onRemoveArtifact={onRemoveArtifact}
          />
        )
      })}
    </div>
  )
}
