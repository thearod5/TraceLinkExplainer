import React from 'react'
import { SEARCH_RESULTS_PER_PAGE } from '../../../../../constants'
import { createArtifactDisplayModel } from '../../../../../operations/artifacts/WordCreator'
import { Artifact } from '../../../../../operations/types/Dataset'
import LoadingBar from '../../../../meta/LoadingBar'
import SearchResultsPage from './SearchResultsPage'
import { SearchFooter } from '../SearchFooter'
import usePageCounter from '../hooks/usePageCounter'
import useSelectedArtifactCounter from '../hooks/useSelectedArtifactCounter'

/* Responsibility: Defines the HTML/CSS structure of the Search.tsx
 *
 */

interface SearchResultProps {
  artifacts: Artifact[],
  addArtifact: (artifact: Artifact) => void
  removeArtifact: (artifact: Artifact) => void
  isLoading: boolean
}

export default function SearchResults (props: SearchResultProps) {
  const { artifacts, isLoading, addArtifact, removeArtifact } = props
  const totalPages = artifacts.length / SEARCH_RESULTS_PER_PAGE

  const [numberSelected, onSelectArtifact, onRemoveArtifact] = useSelectedArtifactCounter({ totalPages, addArtifact, removeArtifact })
  const [currentPage, onNextPage, onPreviousPage] = usePageCounter({ totalPages })

  // subcomponents
  const loadingBar = LoadingBar()

  const footer = (
    <SearchFooter
      page={currentPage}
      totalPages={totalPages}
      message={''}
      onNextPage={onNextPage}
      onPreviousPage={onPreviousPage}
      numberSelected={numberSelected}
    />
  )

  const startIndex = currentPage * SEARCH_RESULTS_PER_PAGE
  const endIndex = startIndex + SEARCH_RESULTS_PER_PAGE

  const body = (
    <div style={{ height: '90%' }}>
      <div
        className="flexRowContentLeft widthFull overflowYScroll"
        style={{ height: '90%' }}
      >
        <SearchResultsPage
          numberOfTotalResults={artifacts.length}
          results={artifacts.slice(startIndex, endIndex).map(a => createArtifactDisplayModel(a))}
          selectArtifact={onSelectArtifact}
          removeArtifact={onRemoveArtifact}
        />
      </div>

      <div style={{ height: '10%' }}>{footer}</div>
    </div>
  )

  return isLoading ? loadingBar : body
}
