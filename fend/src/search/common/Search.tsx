import React, { useState } from "react";
import styled from "styled-components";
import { Artifact } from "../../../../shared/Dataset";
import { PAGE_NAP_HEIGHT, PAGE_NAV_MARGIN_TOP } from "../../nav/PageTitle";
import SearchResultsDisplay from "./results/SearchResultsDisplay";
import SearchBar from "./SearchBar";
import TabBar from "./tabbar/TabBar";
import { TabKeys, Tabs } from "./tabbar/types";
import { SearchResults, SuggestionFunctionType } from "./types";

export interface SearchProps {
  suggestionFunction: SuggestionFunctionType;
  searchFunction: (
    query: string,
    relatedToArtifact?: Artifact
  ) => SearchResults[];
  searchOptions: string[];
}

function getSelectedItems(
  searchResultList: SearchResults[],
  selectedIndex: number
) {
  const type_selected = Object.keys(Tabs)[selectedIndex];

  return searchResultList
    .filter(
      (searchResults) =>
        searchResults.type === type_selected || type_selected === TabKeys[0] // All
    )
    .map((searchResult) => searchResult.items)
    .flat();
}

const DEFAULT_INDEX = 0;

//TODO: Separate Row Height from search bar and vertically center so that all matches the page header
export default function Search(props: SearchProps) {
  const [results, setResults] = useState<SearchResults[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(DEFAULT_INDEX);

  const startSearch = (searchString: string) => {
    setResults(props.searchFunction(searchString));
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
        <SearchResultsDisplay results={selectedItems} />
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
