import React from 'react'
import { MAX_SEARCH_RESULTS_PER_PAGE } from '../../../../../constants'
import { createArtifactDisplayModel } from '../../../../../operations/artifacts/WordCreator'
import { Artifact } from '../../../../../operations/types/Project'
import LoadingBar from '../../../../meta/LoadingBar'
import usePageCounter from '../hooks/usePageCounter'
import useSelectedArtifactCounter from '../hooks/useSelectedArtifactCounter'
import { SearchFooter } from '../SearchFooter'
import SearchResultsPage from './SearchResultsPage'

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
  const totalPages = Math.floor(artifacts.length / MAX_SEARCH_RESULTS_PER_PAGE) + 1

  const [numberSelected, onSelectArtifact, onRemoveArtifact] = useSelectedArtifactCounter({ totalPages, addArtifact, removeArtifact })
  const [currentPage, onNextPage, onPreviousPage] = usePageCounter({ totalPages })

  const footer = (
    <SearchFooter
      pageIndex={currentPage}
      totalPages={totalPages}
      message={''}
      onNextPage={onNextPage}
      onPreviousPage={onPreviousPage}
      numberSelected={numberSelected}
    />
  )

  const startIndex = currentPage * MAX_SEARCH_RESULTS_PER_PAGE
  const endIndex = startIndex + MAX_SEARCH_RESULTS_PER_PAGE

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

  return isLoading ? LoadingBar() : body
}
