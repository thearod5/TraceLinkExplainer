import React from 'react'
import { NUMBER_RESULTS_PROMPT } from '../../../../../constants'
import { getDefaultRelationships } from '../../../../../operations/artifacts/WordCreator'
import { Artifact } from '../../../../../operations/types/Project'
import { ArtifactClickAction } from '../types'
import SearchResultAccordion from './SearchResultAccordion'

interface SearchResultsProps {
  numberOfTotalResults: number;
  results: Artifact[];
  selectArtifact: ArtifactClickAction;
  removeArtifact: ArtifactClickAction;
}

export default function SearchResultsPage (props: SearchResultsProps) {
  const numberOfTotalResults = props.numberOfTotalResults
  return (
    <div className="sizeFull flexColumn overflowYScroll">
      <label className="padVerticalLight widthFull textAlignCenter">
        {numberOfTotalResults + NUMBER_RESULTS_PROMPT}
      </label>
      {props.results.map((searchItem) => {
        return (
          <SearchResultAccordion
            key={searchItem.name}
            artifact={searchItem}
            families={getDefaultRelationships()}
            selectArtifact={props.selectArtifact}
            removeArtifact={props.removeArtifact}
          />
        )
      })}
    </div>
  )
}
