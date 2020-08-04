import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Artifact, Dataset, SearchItem } from "../../../../shared/Dataset";
import { RootState } from "../../redux";
import { ArtifactMutatorActionType } from "../../redux/actions";
import { PAGE_NAP_HEIGHT } from "../nav/PageTitle";
import { getSelectedItems } from "./filtering/filterSearchResults";
import { getNumberOfResults } from "./filtering/searchOptionsCreator";
import ItemDisplay from "./items/ItemDisplay";
import SearchBar from "./searchbar/SearchBar";
import SearchSnackBar from "./snackbar/SearchSnackBar";
import TabBar from "./tabbar/TabBar";
import { Tabs } from "./tabbar/types";
import { SuggestionFunctionType } from "./types";

const DEFAULT_INDEX = 0;
const SEARCH_LIMIT = -1; //TODO: Fix buffer overflow

//TODO: Fix empty query not returning results
//TODO: Add loading symbol while initial query finishes

export interface SearchProps {
  searchFunction: SuggestionFunctionType;
  getSearchOptions: (selectedIndex: number) => string[];
  dispatchEvent: (artifact: Artifact) => ArtifactMutatorActionType;
}

//TODO: Separate Row Height from search bar and vertically center so that all matches the page header
export default function Search(props: SearchProps) {
  const [searchResults, setSearchResults] = useState<SearchItem[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(DEFAULT_INDEX);
  const [numberOfResults, setNumberOfResulst] = useState([0, 0, 0, 0]);
  const [errorOccurred, setErrorOccurred] = useState(false);

  const dataset: Dataset = useSelector((state: RootState) => state.dataset);
  const dispatch = useDispatch();

  /* Requeset API for search results
   * 1. Set as results state
   * 2. Count number of each type and set number of results
   */
  const startSearch = (searchString: string) => {
    props
      .searchFunction(dataset.name, searchString, SEARCH_LIMIT)
      .then((results: SearchItem[]) => {
        setSearchResults(results);
        const resultCounts = getNumberOfResults(results);
        setNumberOfResulst(resultCounts);
      })
      .catch((e) => {
        setErrorOccurred(true);
      });
  };

  const createDispatchAction = (artifact: Artifact) => {
    dispatch(props.dispatchEvent(artifact));
  };

  const handleSnackBarClose = () => {
    setErrorOccurred(false);
  };

  const selectedItems = getSelectedItems(searchResults, selectedIndex);

  /* eslint-disable-next-line react-hooks/exhaustive-deps */
  useEffect(() => startSearch(""), []);

  return (
    <SearchContainer>
      <SearchRow style={{ height: `${PAGE_NAP_HEIGHT}px` }}>
        <SearchBar
          onSubmit={startSearch}
          searchOptions={props.getSearchOptions(selectedIndex)}
        />
      </SearchRow>
      <SearchRow>
        <TabBar
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
          tabs={Tabs}
          numberOfResults={numberOfResults}
        />
      </SearchRow>
      <SearchRow>
        <ItemDisplay
          results={selectedItems}
          clickAction={createDispatchAction}
        />
      </SearchRow>
      <SearchSnackBar open={errorOccurred} handleClose={handleSnackBarClose} />
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
  justify-content: center;
  width: 100%;
`;
