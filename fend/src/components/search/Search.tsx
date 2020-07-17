import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Artifact, Dataset, SearchItem } from "../../../../shared/Dataset";
import { RootState } from "../../redux";
import { ArtifactMutatorActionType } from "../../redux/actions";
import { PAGE_NAP_HEIGHT, PAGE_NAV_MARGIN_TOP } from "../nav/PageTitle";
import { getSelectedItems } from "./filtering/filterSearchResults";
import { getNumberOfResults } from "./filtering/searchOptionsCreator";
import ItemDisplay from "./items/ItemDisplay";
import SearchBar from "./searchbar/SearchBar";
import TabBar from "./tabbar/TabBar";
import { Tabs } from "./tabbar/types";
import { SuggestionFunctionType } from "./types";

const DEFAULT_INDEX = 0;
const SEARCH_LIMIT = 30; //TODO: Fix buffer overflow

//TODO: Fix empty query not returning results

export interface SearchProps {
  searchFunction: SuggestionFunctionType;
  getSearchOptions: (selectedIndex: number) => string[];
  dispatchEvent: (artifact: Artifact) => ArtifactMutatorActionType;
}

//TODO: Separate Row Height from search bar and vertically center so that all matches the page header
export default function Search(props: SearchProps) {
  const dataset: Dataset = useSelector((state: RootState) => state.dataset);
  const dispatch = useDispatch();
  const [results, setResults] = useState<SearchItem[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(DEFAULT_INDEX);
  const [numberOfResults, setNumberOfResulst] = useState([0, 0, 0, 0]);

  // Search for query and separate results
  const startSearch = (searchString: string) => {
    props
      .searchFunction(dataset.name, searchString, SEARCH_LIMIT)
      .then((results: SearchItem[]) => {
        const resultCounts = getNumberOfResults(results);

        setNumberOfResulst(resultCounts);
        setResults(results);
      });
  };
  const createDispatchAction = (artifact: Artifact) => {
    dispatch(props.dispatchEvent(artifact));
  };

  const selectedItems = getSelectedItems(results, selectedIndex);

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
    </SearchContainer>
  );
}

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-content: flex-end;
  margin-top: ${PAGE_NAV_MARGIN_TOP}px;
`;

const SearchRow = styled.div`
  display: flex;
  flex-direct: row;
  justify-content: center;
  width: 100%;
`;
