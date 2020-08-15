import React from "react";
import { ArtifactDisplayModel } from "../../../shared/types/Dataset";
import { NUMBER_RESULTS_PROMPT } from "../Constants";
import { ArtifactClickAction } from "../types";
import SearchResultItem from "./item/SearchResultItem";

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
      <label className="padVerticalLight widthFull textAlignCenter">
        {numberOfTotalResults + NUMBER_RESULTS_PROMPT}
      </label>
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
