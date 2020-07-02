import TextField from "@material-ui/core/TextField";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchIcon from "@material-ui/icons/Search";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Artifact } from "../../../../shared/Dataset";
import { PAGE_NAP_HEIGHT, PAGE_NAV_MARGIN_TOP } from "../../nav/PageTitle";
import SearchResultsDisplay from "./SearchResultsDisplay";
import TabBar from "./TabBar";

const SEARCH_BAR_ID = "TARGET_ARTIFACT_SEARCH_BAR";
const SEARCH_BAR_WIDTH = 600;
const SEARCH_BAR_MAX_WIDTH = 1000;
const SEARCH_BAR_HEIGHT = 40;

export interface SearchResult {
  artifact: Artifact;
  similarity: number;
}

export interface SearchSet {
  results: SearchResult[];
  type: string;
}

interface SearchProps {
  recommendationFunction: (
    query: string,
    relatedToArtifact?: Artifact
  ) => string[];
  searchFunction: (query: string, relatedToArtifact?: Artifact) => SearchSet[];
}

const ENTER_KEY_CODE = 13;

//TODO: Separate Row Height from search bar and vertically center so that all matches the page header
function Search(props: SearchProps) {
  const [results, setResults] = useState<SearchSet[]>([]);

  useEffect(() => startSearch(""), []);
  const startSearch = (searchString: string) => {
    console.log("Starting search for: ", searchString);
    let tempResults = props.searchFunction(searchString);
    console.log(tempResults);
    setResults(tempResults);
  };

  return (
    <SearchContainer>
      <SearchRow style={{ height: `${PAGE_NAP_HEIGHT}px` }}>
        <TextField
          id={SEARCH_BAR_ID}
          onKeyDown={(event) =>
            event.keyCode === ENTER_KEY_CODE
              ? startSearch((event.target as HTMLInputElement).value)
              : undefined
          }
          variant="outlined"
          InputProps={{
            endAdornment: (
              <SearchIcon
                style={{
                  height: `${PAGE_NAP_HEIGHT}px`,
                }}
              />
            ),
            style: { height: `${PAGE_NAP_HEIGHT}px` },
          }}
          style={SearchBarStyle}
        />
        <MoreVertIcon style={MoreIconStyle} />
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

const MORE_ICON_SIDE_MARGIN = 10;
const MoreIconStyle = {
  height: `${PAGE_NAP_HEIGHT}`,
  marginLeft: `${MORE_ICON_SIDE_MARGIN}px`,
};

const SearchBarStyle = {
  width: `${SEARCH_BAR_WIDTH}px`,
  maxWidth: `${SEARCH_BAR_MAX_WIDTH}px`,
  height: `${SEARCH_BAR_HEIGHT}px`,
};

export default Search;
