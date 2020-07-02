import React, { useState } from "react";
import styled from "styled-components";
import { Artifact } from "../../../../shared/Dataset";
import { PAGE_NAP_HEIGHT, PAGE_NAV_MARGIN_TOP } from "../../nav/PageTitle";
import SearchBar from "./SearchBar";
import SearchResultsDisplay from "./SearchResultsDisplay";
import TabBar from "./TabBar";

export interface SearchResult {
  artifact: Artifact;
  similarity: number;
}

export interface SearchSet {
  results: SearchResult[];
  type: string;
}

export type SuggestionFunctionType = (
  query: string,
  relatedToArtifact?: Artifact
) => string[];

export interface SearchProps {
  suggestionFunction: SuggestionFunctionType;
  searchFunction: (query: string, relatedToArtifact?: Artifact) => SearchSet[];
  searchOptions: string[];
}

//TODO: Separate Row Height from search bar and vertically center so that all matches the page header
export default function Search(props: SearchProps) {
  const [results, setResults] = useState<SearchSet[]>([]);

  const startSearch = (searchString: string) => {
    setResults(props.searchFunction(searchString));
  };

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
        <TabBar />
      </SearchRow>
      <SearchRow>
        {results.length > 0 ? (
          <SearchResultsDisplay results={results[0].results} /> //TODO: Filter by selected tab
        ) : null}
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

const Suggestion = styled.div``;
