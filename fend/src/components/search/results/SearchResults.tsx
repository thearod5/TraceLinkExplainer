import React from "react";
import styled from "styled-components";
import { ArtifactDisplayModel } from "../../../shared/types/Dataset";
import { ArtifactClickAction } from "../types";
import SearchResultItem from "./item/SearchResultItem";

const NUMBER_RESULTS_PROMPT = " total results were found";
const NUMBER_DISPLAY_VERTICAL_PADDING = 10;

interface SearchResultsProps {
  numberOfTotalResults: number;
  results: ArtifactDisplayModel[];
  selectArtifact: ArtifactClickAction;
  removeArtifact: ArtifactClickAction;
}

export default function SearchResults(props: SearchResultsProps) {
  const numberOfTotalResults = props.numberOfTotalResults;
  return (
    <div className="flexColumn sizeFull">
      <NumberResultsDisplay>
        {numberOfTotalResults === 0
          ? ""
          : numberOfTotalResults + NUMBER_RESULTS_PROMPT}
      </NumberResultsDisplay>
      {props.results.map((searchItem) => {
        return (
          <SearchResultItem
            key={searchItem.artifact.id}
            result={searchItem.artifact}
            words={searchItem.words}
            selectArtifact={props.selectArtifact}
            removeArtifact={props.removeArtifact}
          />
        );
      })}
    </div>
  );
}

const NumberResultsDisplay = styled.div`
  width: 100%;
  text-align: center;
  padding-top: ${NUMBER_DISPLAY_VERTICAL_PADDING}px;
  padding-bottom: ${NUMBER_DISPLAY_VERTICAL_PADDING}px;
`;
