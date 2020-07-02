import React from "react";
import styled from "styled-components";
import { SearchResult } from "./Search";
import SimilarityRectangle from "./SimilarityRectangle";

interface SearchResultProps {
  result: SearchResult;
}

export default function Result(props: SearchResultProps) {
  return (
    <ResultContainer>
      <SimilarityRectangle similarity={props.result.similarity} />
      <ResultIdContainer>
        <label>{props.result.artifact.id}</label>
      </ResultIdContainer>
      <ResultBodyContainer>
        <label>{props.result.artifact.body}</label>
      </ResultBodyContainer>
    </ResultContainer>
  );
}

const ResultContainer = styled.div`
  display: flex;
  flex-direct: row;
  width 100%;
  border: 1px solid red;
`;

const ResultIdContainer = styled.div`
  flex-grow: 4;
`;

const ResultBodyContainer = styled.div`
  flex-grow: 4;
`;
