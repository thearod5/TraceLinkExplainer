import { LinearProgress } from '@material-ui/core'
import React from 'react'
import { StartSearchCallback, VoidCallback } from '../../constants'
import { Artifact, ArtifactDisplayModel } from '../../operations/types/Dataset'
import SearchBar from './bar/SearchBar'
import SearchResults from './results/SearchResults'
import { SearchFooter } from './SearchFooter'

/* Responsibility: Defines the HTML/CSS structure of the Search.tsx
 *
 */

interface SearchProps {
  startSearch: StartSearchCallback
  currentPage: number
  footerMessage: string
  areArtifactSelected: boolean
  totalPages: number
  handleStepCompleted: VoidCallback
  onNextPage: VoidCallback
  onPreviousPage: VoidCallback
  numberSelected: number
  searchResultsInView: ArtifactDisplayModel[]
  numberOfTotalResults: number
  selectArtifact: (artifact: Artifact) => void
  removeArtifact: (artifact: Artifact) => void
  isLoading: boolean
}

export default function Search (props: SearchProps) {
  const {
    isLoading, startSearch, currentPage, totalPages,
    footerMessage, areArtifactSelected, handleStepCompleted,
    onNextPage, onPreviousPage, numberSelected, numberOfTotalResults,
    searchResultsInView, selectArtifact, removeArtifact
  } = props
  /*
   * Child Components
   */
  const searchBar = (
    <SearchBar onSearch={(query: string) => startSearch(query, -1)} />
  )

  const loadingBar = (
    <LinearProgress color="secondary" variant="indeterminate" />
  )

  const footer = (
    <SearchFooter
      page={currentPage}
      totalPages={totalPages}
      message={footerMessage}
      completed={areArtifactSelected}
      onStepCompleted={handleStepCompleted}
      onNextPage={onNextPage}
      onPreviousPage={onPreviousPage}
      numberSelected={numberSelected}
    />
  )

  const body = (
    <div style={{ height: '90%' }}>
      <div
        className="flexRowContentLeft widthFull overflowYScroll"
        style={{ height: '90%' }}
      >
        <SearchResults
          numberOfTotalResults={numberOfTotalResults}
          results={searchResultsInView}
          selectArtifact={selectArtifact}
          removeArtifact={removeArtifact}
        />
      </div>

      <div style={{ height: '10%' }}>{footer}</div>
    </div>
  )

  return (
    <div className="flexColumn alignContentEnd heightFull overflowYScroll">
      <div
        className="flexRowContentLeft widthFull padVerticalLight"
        style={{ height: '10%' }}
      >
        {searchBar}
      </div>
      {isLoading ? loadingBar : body}
    </div>
  )
}
