import React from "react";
import { getDefaultFamilies } from "../../../../shared/artifacts/WordCreator";
import { ArtifactDisplayModel } from "../../../../shared/types/Dataset";
import { NUMBER_RESULTS_PROMPT } from "../../../constants";
import SearchResultAccordion from "./SearchResultAccordion";
import { ArtifactClickAction } from "../types";

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
          <SearchResultAccordion
            key={searchItem.artifact.id}
            result={searchItem.artifact}
            words={searchItem.words}
            families={getDefaultFamilies()}
            selectArtifact={props.selectArtifact}
            removeArtifact={props.removeArtifact}
          />
        );
      })}
    </div>
  );
}