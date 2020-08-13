import { LinearProgress } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "../../redux";
import { ArtifactMutatorActionType } from "../../redux/actions";
import { Artifact, Dataset } from "../../shared/types/Dataset";
import { SearchItem } from "../../shared/types/Search";
import SearchBar from "./bar/SearchBar";
import SearchResults from "./results/SearchResults";
import { SuggestionFunctionType } from "./types";

const SEARCH_LIMIT = 30;
export interface SearchProps {
  searchFunction: SuggestionFunctionType;
  onArtifactSelected: (artifact: Artifact) => ArtifactMutatorActionType;
  onArtifactRemoved: (artifact: Artifact) => ArtifactMutatorActionType;
}

export default function Search(props: SearchProps) {
  const [searchResults, setSearchResults] = useState<SearchItem[]>([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const dataset: Dataset = useSelector((state: RootState) => state.dataset);

  /* Requeset API for search results
   * 1. Set as results state
   * 2. Count number of each type and set number of results
   */
  const startSearch = (searchString: string) => {
    setLoading(true);
    props
      .searchFunction(dataset.name, searchString, SEARCH_LIMIT)
      .then((results: SearchItem[]) => {
        setSearchResults(results);
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
      });
  };

  /* eslint-disable-next-line react-hooks/exhaustive-deps */
  useEffect(() => startSearch(""), []);

  const selectArtifact = (artifact: Artifact) =>
    dispatch(props.onArtifactSelected(artifact));
  const removeArtifact = (artifact: Artifact) =>
    dispatch(props.onArtifactRemoved(artifact));

  return (
    <div className="flexColumn alignContentEnd padTopLight heightFull overflowYScroll">
      <SearchRow style={{ height: "20%" }}>
        <SearchBar onSubmit={startSearch} />
      </SearchRow>

      {loading ? (
        <LinearProgress color="secondary" />
      ) : (
        <SearchRow>
          <SearchResults
            results={searchResults}
            selectArtifact={selectArtifact}
            removeArtifact={removeArtifact}
          />
        </SearchRow>
      )}
    </div>
  );
}
const SearchRow = styled.div`
  display: flex;
  flex-direct: row;
  justify-content: left;
  width: 100%;
`;
