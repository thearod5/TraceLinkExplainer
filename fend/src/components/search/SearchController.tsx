import { LinearProgress } from "@material-ui/core";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeStep, setError } from "../../redux/actions";
import { getCurrentStep } from "../../redux/selectors";
import { ArtifactMutatorActionType } from "../../redux/types";
import { createArtifactDisplayModel } from "../../shared/artifacts/WordCreator";
import {
  SELECT_SOURCE_STEP, VIEW_TRACE_STEP
} from "../../shared/pagechanger/constants";
import { getStepChangeError } from "../../shared/pagechanger/PageChanger";
import {
  Artifact,
  ArtifactDisplayModel,
  artifactsAreEqual
} from "../../shared/types/Dataset";
import SearchBar from "./bar/SearchBar";
import {
  SEARCH_DISPLAY_LIMIT,
  SEARCH_LIMIT,
  SELECT_SOURCE_MESSAGE,
  SELECT_TARGET_MESSAGE
} from "./Constants";
import { SearchFooter } from "./SearchFooter";
import SearchResults from "./SearchResults";
import { SuggestionFunctionType } from "./types";

/*
 * In charge of managing the state of the search panel.
 */
export interface SearchProps {
  searchFunction: SuggestionFunctionType;
  onArtifactsSelected: (artifact: Artifact[]) => ArtifactMutatorActionType;
}

export default function SearchController(props: SearchProps) {
  const [areArtifactSelected, setAreArtifactSelected] = useState(false);
  const [searchResults, setSearchResults] = useState<ArtifactDisplayModel[]>([]);
  const [resultsIndexStart, setResultsIndexStart] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedArtifacts, setSelectedArtifacts] = useState<Artifact[]>([]);

  const dispatch = useDispatch();
  const currentStep: number = useSelector(getCurrentStep);

  /*
   * Visual Calculation
   */
  const numberOfResults = searchResults.length;
  const potentialEndIndex = resultsIndexStart + SEARCH_DISPLAY_LIMIT;
  const endIndex =
    potentialEndIndex >= numberOfResults ? numberOfResults : potentialEndIndex;

  const searchResultsInView = searchResults.slice(resultsIndexStart, endIndex);
  const totalPages = Math.ceil(searchResults.length / SEARCH_DISPLAY_LIMIT);
  const currentPage = resultsIndexStart / SEARCH_DISPLAY_LIMIT + 1;
  const footerMessage =
    currentStep === SELECT_SOURCE_STEP
      ? SELECT_SOURCE_MESSAGE
      : SELECT_TARGET_MESSAGE;

  /*
   * Search API call
   */
  const startSearch = useCallback(
    (searchString: string, limit: number = SEARCH_LIMIT) => {
      setIsLoading(true);
      props
        .searchFunction(searchString, limit)
        .then((results: Artifact[]) => {
          const displayModels: ArtifactDisplayModel[] = results.map(
            (a: Artifact) => createArtifactDisplayModel(a)
          );
          setSearchResults(displayModels);
          setIsLoading(false);
        })
        .catch((e) => {
          dispatch(setError(e.toString()));
          setIsLoading(false);
        });
    },
    // eslint-disable-next-line
    [props]
  );

  /*
   * Handlers
   */

  const setResultsInView = (startIndex: number) => {
    if (startIndex < 0) return dispatch(setError("No previous page."));
    if (startIndex >= numberOfResults)
      return dispatch(setError("Reached end of results."));

    setIsLoading(true);
    setResultsIndexStart(startIndex);
    setIsLoading(false);
  };

  const onNextPage = () =>
    setResultsInView(resultsIndexStart + SEARCH_DISPLAY_LIMIT);

  const onPreviousPage = () =>
    setResultsInView(resultsIndexStart - SEARCH_DISPLAY_LIMIT);

  const selectArtifact = (artifact: Artifact) => {
    setSelectedArtifacts([...selectedArtifacts, artifact]);
    setAreArtifactSelected(false); //changes made, results not up-to-date
  };

  const removeArtifact = (artifact: Artifact) => {
    setSelectedArtifacts(
      selectedArtifacts.filter((a) => !artifactsAreEqual(a, artifact))
    );
    setAreArtifactSelected(false); //changes made, results not up-to-date
  };

  const handleStepCompleted = () => {
    if (selectedArtifacts.length === 0)
      return dispatch(setError("No artifacts selected."));

    if (currentStep >= VIEW_TRACE_STEP)
      return;

    dispatch(props.onArtifactsSelected(selectedArtifacts));

    const nextStep = currentStep + 1;
    const error = getStepChangeError(nextStep);
    const wasSuccessful = error === undefined
    if (wasSuccessful) {
      setAreArtifactSelected(true); //changes made, results not up-to-date
      dispatch(changeStep(nextStep));
    } else dispatch(setError(error));
  };

  useEffect(() => startSearch(""), [startSearch]);

  /*
   * Child Components
   */
  const searchBar = (
    <SearchBar onSearch={(query: string) => startSearch(query, -1)} />
  );

  const loadingBar = (
    <LinearProgress color="secondary" variant="indeterminate" />
  );

  const footer = (
    <SearchFooter
      page={currentPage}
      totalPages={totalPages}
      message={footerMessage}
      completed={areArtifactSelected}
      onStepCompleted={handleStepCompleted}
      onNextPage={onNextPage}
      onPreviousPage={onPreviousPage}
    />
  );

  const body = (
    <div style={{ height: "90%" }}>
      <div
        className="flexRowContentLeft widthFull overflowYScroll"
        style={{ height: "90%" }}
      >
        <SearchResults
          numberOfTotalResults={searchResults.length}
          results={searchResultsInView}
          selectArtifact={selectArtifact}
          removeArtifact={removeArtifact}
        />
      </div>

      <div style={{ height: "10%" }}>{footer}</div>
    </div>
  );

  return (
    <div className="flexColumn alignContentEnd heightFull overflowYScroll">
      <div
        className="flexRowContentLeft widthFull padVerticalLight"
        style={{ height: "10%" }}
      >
        {searchBar}
      </div>
      {isLoading ? loadingBar : body}
    </div>
  );
}
