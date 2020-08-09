import { LinearProgress } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Artifact, Dataset, SearchItem } from "../../../../shared/Dataset";
import { RootState } from "../../redux";
import { ArtifactMutatorActionType } from "../../redux/actions";
import SearchBar from "./bar/SearchBar";
import SearchResults from "./results/SearchResults";
import { SuggestionFunctionType } from "./types";

const SEARCH_LIMIT = 30; //TODO: Fix buffer overflow

//TODO: Fix empty query not returning results
//TODO: Add loading symbol while initial query finishes

export interface SearchProps {
  searchFunction: SuggestionFunctionType;
  dispatchEvent: (artifact: Artifact) => ArtifactMutatorActionType;
}

export default function Search(props: SearchProps) {
  const [searchResults, setSearchResults] = useState<SearchItem[]>([]);
  const [loading, setLoading] = useState(false);

  const dataset: Dataset = useSelector((state: RootState) => state.dataset);
  const dispatch = useDispatch();

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

  const createDispatchAction = (artifact: Artifact) => {
    dispatch(props.dispatchEvent(artifact));
  };

  /* eslint-disable-next-line react-hooks/exhaustive-deps */
  useEffect(() => startSearch(""), []);

  return (
    <SearchContainer>
      <SearchRow style={{ height: "20%" }}>
        <SearchBar onSubmit={startSearch} />
      </SearchRow>

      {loading ? (
        <LinearProgress color="secondary" />
      ) : (
        <SearchRow>
          <SearchResults
            results={searchResults}
            clickAction={createDispatchAction}
          />
        </SearchRow>
      )}
    </SearchContainer>
  );
}

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-content: flex-end;
  height: 100%;
  overflow-y: scroll;
  padding-top: 10px;
`;

const SearchRow = styled.div`
  display: flex;
  flex-direct: row;
  justify-content: left;
  width: 100%;
`;
