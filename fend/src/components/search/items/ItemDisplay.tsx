import React from "react";
import styled from "styled-components";
import { SearchItem } from "../../../../../shared/Dataset";
import { ArtifactClickAction } from "../types";
import SearchResultItem from "./Item";

const NUMBER_RESULTS_PROMPT = " results were found";
const NUMBER_DISPLAY_VERTICAL_PADDING = 10;

interface SearchResultsProps {
  results: SearchItem[];
  searchItemResultPage: string;
  clickAction: ArtifactClickAction;
}

export default function ItemDisplay(props: SearchResultsProps) {
  return (
    <SearchResultsDisplayContainer>
      <NumberResultsDisplay>
        {props.results.length + NUMBER_RESULTS_PROMPT}
      </NumberResultsDisplay>
      {props.results.map((result) => (
        <SearchResultItem
          key={result.artifact.id}
          result={result}
          searchItemResultPage={props.searchItemResultPage}
          clickAction={props.clickAction}
        />
      ))}
    </SearchResultsDisplayContainer>
  );
}

const SearchResultsDisplayContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const NumberResultsDisplay = styled.div`
  width: 100%;
  text-align: center;
  padding-top: ${NUMBER_DISPLAY_VERTICAL_PADDING}px;
  padding-bottom: ${NUMBER_DISPLAY_VERTICAL_PADDING}px;
`;
