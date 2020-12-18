import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../../../App'
import { MAX_SEARCH_RESULTS_PER_PAGE } from '../../../../constants'
import { Artifact } from '../../../../types/Project'
import LoadingBar from '../../../meta/LoadingBar'
import useSelectedArtifactCounter from '../hooks/useSelectedArtifactCounter'
import { SearchFooter } from '../SearchFooter'
import SearchResultsPage from './SearchResultsPage'

/* Provides pagination for displaying a list of artifacts, typically query results.
 *
 */

interface SearchResultProps {
  artifacts: Artifact[],
  addArtifact: (artifact: Artifact) => void
  removeArtifact: (artifact: Artifact) => void
  isLoading: boolean
}

export default function SearchResults (props: SearchResultProps) {
  const { setError } = useContext(AppContext)
  const { artifacts, isLoading, addArtifact, removeArtifact } = props
  const totalPages = Math.floor(artifacts.length / MAX_SEARCH_RESULTS_PER_PAGE) + 1

  const [numSelectedArtifacts, onSelectArtifact, onRemoveArtifact] = useSelectedArtifactCounter({ totalPages, addArtifact, removeArtifact })
  const [currentPage, setCurrentPage] = useState(0)

  const onNextPage = () => {
    if (currentPage >= totalPages - 1) {
      setError('cannot move beyond last page')
    } else {
      setCurrentPage(currentPage + 1)
    }
  }

  const onPreviousPage = () => {
    if (currentPage === 0) {
      setError('cannot move before first page')
    } else {
      setCurrentPage(currentPage - 1)
    }
  }

  const footer = (
    <SearchFooter
      pageIndex={currentPage}
      totalPages={totalPages}
      message={''}
      onNextPage={onNextPage}
      onPreviousPage={onPreviousPage}
      numberSelected={numSelectedArtifacts}
    />
  )

  useEffect(() => {
    setCurrentPage(0)
  }, [isLoading])

  const startIndex = currentPage * MAX_SEARCH_RESULTS_PER_PAGE
  const endIndex = startIndex + MAX_SEARCH_RESULTS_PER_PAGE

  const body = (
    <div className='sizeFull overflowYScroll'>
      <div
        className="widthFull overflowYScroll"
        style={{ height: '90%' }}
      >
        <SearchResultsPage
          numberOfTotalResults={artifacts.length}
          resultsSlice={artifacts.slice(startIndex, endIndex)}
          onSelectArtifact={onSelectArtifact}
          onRemoveArtifact={onRemoveArtifact}
        />
      </div>
      <div style={{ height: '10%' }}>{footer}</div>
    </div>
  )

  return isLoading ? LoadingBar() : body
}
