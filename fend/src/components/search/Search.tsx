import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { Artifact } from "../../../../shared/Dataset";
import { ArtifactMutatorActionType } from "../../redux/actions";
import { PAGE_NAP_HEIGHT, PAGE_NAV_MARGIN_TOP } from "../nav/PageTitle";
import { getSelectedItems } from "./filtering/filterSearchResults";
import ItemDisplay from "./items/ItemDisplay";
import SearchBar from "./searchbar/SearchBar";
import TabBar from "./tabbar/TabBar";
import { Tabs } from "./tabbar/types";
import { SearchResults, SuggestionFunctionType } from "./types";

const DEFAULT_INDEX = 0;

export interface SearchProps {
  suggestionFunction: SuggestionFunctionType;
  searchFunction: (
    query: string,
    relatedToArtifact?: Artifact
  ) => SearchResults[];
  searchOptions: string[];
  searchItemResultPage: string;
  dispatchEvent: (artifact: Artifact) => ArtifactMutatorActionType;
}

//TODO: Separate Row Height from search bar and vertically center so that all matches the page header
export default function Search(props: SearchProps) {
  const dispatch = useDispatch();
  const [results, setResults] = useState<SearchResults[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(DEFAULT_INDEX);

  // Search for query and separate results
  const startSearch = (searchString: string) => {
    setResults(props.searchFunction(searchString));
  };
  const createDispatchAction = (artifact: Artifact) => {
    dispatch(props.dispatchEvent(artifact));
  };

  const selectedItems = getSelectedItems(results, selectedIndex);

  return (
    <SearchContainer>
      <SearchRow style={{ height: `${PAGE_NAP_HEIGHT}px` }}>
        <SearchBar
          suggestionFunction={props.suggestionFunction}
          onSubmit={startSearch}
          searchOptions={props.searchOptions}
        />
      </SearchRow>
      <SearchRow>
        <TabBar
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
          tabs={Tabs}
        />
      </SearchRow>
      <SearchRow>
        <ItemDisplay
          results={selectedItems}
          searchItemResultPage={props.searchItemResultPage}
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
