import React from 'react'
import { getDefaultRelationships } from '../../../operations/artifacts/WordCreator'
import { ArtifactDisplayModel } from '../../../operations/types/Dataset'
import { NUMBER_RESULTS_PROMPT } from '../../../constants'
import SearchResultAccordion from './SearchResultAccordion'
import { ArtifactClickAction } from '../types'

interface SearchResultsProps {
  numberOfTotalResults: number;
  results: ArtifactDisplayModel[];
  selectArtifact: ArtifactClickAction;
  removeArtifact: ArtifactClickAction;
}

export default function SearchResults (props: SearchResultsProps) {
  const numberOfTotalResults = props.numberOfTotalResults
  return (
    <div className="flexColumn sizeFull">
      <label className="padVerticalLight widthFull textAlignCenter">
        {numberOfTotalResults + NUMBER_RESULTS_PROMPT}
      </label>
      {props.results.map((searchItem) => {
        return (
          <SearchResultAccordion
            key={searchItem.artifact.name}
            result={searchItem.artifact}
            words={searchItem.words}
            families={getDefaultRelationships()}
            selectArtifact={props.selectArtifact}
            removeArtifact={props.removeArtifact}
          />
        )
      })}
    </div>
  )
}
