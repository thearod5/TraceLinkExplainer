import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SEARCH_DISPLAY_LIMIT, SEARCH_LIMIT, SELECT_SOURCE_MESSAGE, SELECT_SOURCE_STEP, SELECT_TARGET_MESSAGE, StartSearchCallback, VIEW_TRACE_STEP } from '../../constants'
import { changeStep, setError } from '../../redux/actions'
import { getCurrentStep } from '../../redux/selectors'
import { appHistory } from '../../redux/store'
import { ArtifactMutatorActionType } from '../../redux/types'
import { createArtifactDisplayModel } from '../../operations/artifacts/WordCreator'
import { getStepChangeError } from '../../operations/pagechanger/PageChanger'
import {
  Artifact,
  ArtifactDisplayModel,
  artifactsAreEqual
} from '../../operations/types/Dataset'
import Search from './Search'
import { SuggestionFunctionType } from './types'

/* Responsibility: Manages the state of the search bar.
 *
 */

export interface SearchProps {
  searchFunction: SuggestionFunctionType;
  onArtifactsSelected: (artifact: Artifact[]) => ArtifactMutatorActionType;
  nextPageLocation: string;
}

export default function SearchController (props: SearchProps) {
  const [areArtifactSelected, setAreArtifactSelected] = useState(false)
  const [searchResults, setSearchResults] = useState<ArtifactDisplayModel[]>([])
  const [resultsIndexStart, setResultsIndexStart] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedArtifacts, setSelectedArtifacts] = useState<Artifact[]>([])

  const dispatch = useDispatch()
  const currentStep: number = useSelector(getCurrentStep)

  /*
   * Visual Calculation
   */
  const numberOfResults = searchResults.length
  const potentialEndIndex = resultsIndexStart + SEARCH_DISPLAY_LIMIT
  const endIndex =
    potentialEndIndex >= numberOfResults ? numberOfResults : potentialEndIndex

  const searchResultsInView = searchResults.slice(resultsIndexStart, endIndex)
  const totalPages = Math.ceil(searchResults.length / SEARCH_DISPLAY_LIMIT)
  const currentPage = resultsIndexStart / SEARCH_DISPLAY_LIMIT + 1
  const footerMessage =
    currentStep === SELECT_SOURCE_STEP
      ? SELECT_SOURCE_MESSAGE
      : SELECT_TARGET_MESSAGE

  /*
   * Search API call
   */
  const startSearch: StartSearchCallback = useCallback(
    (searchString: string, limit: number = SEARCH_LIMIT) => {
      setIsLoading(true)
      props
        .searchFunction(searchString, limit)
        .then((results: Artifact[]) => {
          const displayModels: ArtifactDisplayModel[] = results.map(
            (a: Artifact) => createArtifactDisplayModel(a)
          )
          setSearchResults(displayModels)
          setIsLoading(false)
        })
        .catch((e) => {
          dispatch(setError(e.toString()))
          setIsLoading(false)
        })
    },
    // eslint-disable-next-line
    [props]
  )

  const setResultsInView = (startIndex: number) => {
    if (startIndex < 0) return dispatch(setError('No previous page.'))
    if (startIndex >= numberOfResults) { return dispatch(setError('Reached end of results.')) }

    setIsLoading(true)
    setResultsIndexStart(startIndex)
    setIsLoading(false)
  }

  const onNextPage = () =>
    setResultsInView(resultsIndexStart + SEARCH_DISPLAY_LIMIT)

  const onPreviousPage = () =>
    setResultsInView(resultsIndexStart - SEARCH_DISPLAY_LIMIT)

  const selectArtifact = (artifact: Artifact) => {
    setSelectedArtifacts([...selectedArtifacts, artifact])
    setAreArtifactSelected(false) // changes made, results not up-to-date
  }

  const removeArtifact = (artifact: Artifact) => {
    setSelectedArtifacts(
      selectedArtifacts.filter((a) => !artifactsAreEqual(a, artifact))
    )
    setAreArtifactSelected(false) // changes made, results not up-to-date
  }

  const handleStepCompleted = () => {
    if (selectedArtifacts.length === 0) { return dispatch(setError('No artifacts selected.')) }

    if (currentStep >= VIEW_TRACE_STEP) { return }

    dispatch(props.onArtifactsSelected(selectedArtifacts))

    const nextStep = currentStep + 1
    const error = getStepChangeError(nextStep)
    const wasSuccessful = error === undefined
    if (wasSuccessful) {
      setAreArtifactSelected(true) // changes made, results not up-to-date
      dispatch(changeStep(nextStep))
    } else dispatch(setError(error))
    appHistory.push(props.nextPageLocation)
  }

  useEffect(() => startSearch(''), [startSearch])

  return (
    <Search
      startSearch={startSearch}
      currentPage={currentPage}
      footerMessage={footerMessage}
      areArtifactSelected={areArtifactSelected}
      totalPages={totalPages}
      handleStepCompleted={handleStepCompleted}
      onNextPage={onNextPage}
      onPreviousPage={onPreviousPage}
      numberSelected={selectedArtifacts.length}
      searchResultsInView={searchResultsInView}
      numberOfTotalResults={searchResults.length}
      selectArtifact={selectArtifact}
      removeArtifact={removeArtifact}
      isLoading={isLoading}
    />
  )
}
