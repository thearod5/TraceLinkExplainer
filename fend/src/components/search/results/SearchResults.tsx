import React from "react";
import styled from "styled-components";
import { SearchItem } from "../../../../../shared/Dataset";
import { BORDER_LINE } from "../../../styles/constants";
import { ArtifactClickAction } from "../types";
import SearchResultItem from "./item/Item";

const NUMBER_RESULTS_PROMPT = " results were found";
const NUMBER_DISPLAY_VERTICAL_PADDING = 10;

interface SearchResultsProps {
  results: SearchItem[];
  selectArtifact: ArtifactClickAction;
  removeArtifact: ArtifactClickAction;
}

export default function SearchResults(props: SearchResultsProps) {
  return (
    <SearchResultsDisplayContainer>
      <NumberResultsDisplay>
        {props.results.length + NUMBER_RESULTS_PROMPT}
      </NumberResultsDisplay>
      {props.results.map((searchItem) => {
        return (
          <SearchResultItem
            key={searchItem.artifact.id}
            result={searchItem}
            selectArtifact={props.selectArtifact}
            removeArtifact={props.removeArtifact}
          />
        );
      })}
    </SearchResultsDisplayContainer>
  );
}

const SearchResultsDisplayContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;

const NumberResultsDisplay = styled.div`
  width: 100%;
  text-align: center;
  padding-top: ${NUMBER_DISPLAY_VERTICAL_PADDING}px;
  padding-bottom: ${NUMBER_DISPLAY_VERTICAL_PADDING}px;
  border-bottom: ${BORDER_LINE};
`;
