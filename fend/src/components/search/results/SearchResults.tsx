import { LinearProgress } from "@material-ui/core";
import React from "react";
import styled from "styled-components";
import { SearchItem } from "../../../shared/types/Search";
import { BORDER_LINE } from "../../../styles/constants";
import { ArtifactClickAction } from "../types";
import SearchResultItem from "./item/SearchResultItem";

const NUMBER_RESULTS_PROMPT = " results were found";
const NUMBER_DISPLAY_VERTICAL_PADDING = 10;

interface SearchResultsProps {
  loading: boolean;
  results: SearchItem[];
  selectArtifact: ArtifactClickAction;
  removeArtifact: ArtifactClickAction;
}

export default function SearchResults(props: SearchResultsProps) {
  return (
    <div className="flexColumn sizeFull">
      {props.loading ? (
        <LinearProgress color="secondary" />
      ) : (
        <NumberResultsDisplay>
          {props.results.length + NUMBER_RESULTS_PROMPT}
        </NumberResultsDisplay>
      )}
      {props.results.map((searchItem) => {
        return (
          <SearchResultItem
            key={searchItem.id}
            result={searchItem}
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
  border-bottom: ${BORDER_LINE};
`;
