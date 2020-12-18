import React from 'react'
import { ArtifactCallback, NUMBER_RESULTS_PROMPT } from '../../../../types/constants'
import { Artifact } from '../../../../types/Project'
import { getDefaultRelationships } from '../../../artifact/words/WordCreator'
import SearchArtifactAccordion from './SearchResultAccordion'

interface SearchResultsProps {
  resultsSlice: Artifact[];
  numberOfTotalResults: number;
  onSelectArtifact: ArtifactCallback;
  onRemoveArtifact: ArtifactCallback;
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
