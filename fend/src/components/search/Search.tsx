import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeStep, setError } from "../../redux/actions";
import { getCurrentStep, getError } from "../../redux/selectors";
import { ArtifactMutatorActionType } from "../../redux/types";
import { getStepChangeError } from "../../shared/pagechanger/PageChanger";
import { Artifact } from "../../shared/types/Dataset";
import { SearchItem } from "../../shared/types/Search";
import SearchBar from "./bar/SearchBar";
import SearchResults from "./results/SearchResults";
import { SuggestionFunctionType } from "./types";

const SEARCH_LIMIT = 10;
export interface SearchProps {
  searchFunction: SuggestionFunctionType;
  onArtifactSelected: (artifact: Artifact) => ArtifactMutatorActionType;
  onArtifactRemoved: (artifact: Artifact) => ArtifactMutatorActionType;
}

export default function Search(props: SearchProps) {
  const [searchResults, setSearchResults] = useState<SearchItem[]>([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const error: string | undefined = useSelector(getError);
  const currentStep: number = useSelector(getCurrentStep);

  /* Requeset API for search results
   * 1. Set as results state
   * 2. Count number of each type and set number of results
   */

  const startSearch = useCallback(
    (searchString: string) => {
      setLoading(true);
      props
        .searchFunction(searchString, SEARCH_LIMIT)
        .then((results: SearchItem[]) => {
          setSearchResults(results);
          setLoading(false);
        })
        .catch((e) => {
          dispatch(setError(e.toString()));
          setLoading(false);
        });
    },
    [props]
  );

  const handleStepCompleted = () => {
    const nextStep = currentStep + 1;
    const error = getStepChangeError(nextStep);
    if (error === undefined) dispatch(changeStep(currentStep + 1));
    else dispatch(setError(error));
  };

  useEffect(() => startSearch(""), [startSearch]);

  const selectArtifact = (artifact: Artifact) =>
    dispatch(props.onArtifactSelected(artifact));

  const removeArtifact = (artifact: Artifact) =>
    dispatch(props.onArtifactRemoved(artifact));

  return (
    <div className="flexColumn alignContentEnd padTopLight heightFull overflowYScroll">
      <div className="flexRowContentLeft widthFull" style={{ height: "10%" }}>
        <SearchBar
          onSearch={startSearch}
          onSubmit={handleStepCompleted} //Could fail
        />
      </div>
      <div className="flexRowContentLeft widthFull" style={{ height: "90%" }}>
        <SearchResults
          loading={loading}
          results={searchResults}
          selectArtifact={selectArtifact}
          removeArtifact={removeArtifact}
        />
      </div>
    </div>
  );
}
