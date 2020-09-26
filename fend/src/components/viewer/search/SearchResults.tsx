import React from "react";
import { getDefaultFamilies } from "../../../shared/artifacts/WordCreator";
import { ArtifactDisplayModel } from "../../../shared/types/Dataset";
import { NUMBER_RESULTS_PROMPT } from "./Constants";
import { ArtifactClickAction } from "./types";
import SearchItemAccordion from "./item/SearchItemAccordion";

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
          <SearchItemAccordion
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
