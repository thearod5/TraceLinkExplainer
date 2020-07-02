import React from "react";
import styled from "styled-components";
import Result from "./Result";
import { SearchResult } from "./Search";

interface SearchResultsProps {
  results: SearchResult[];
}

export default function SearchResultsDisplay(props: SearchResultsProps) {
  return (
    <SearchResultsDisplayContainer>
      {props.results.map((result) => (
        <Result result={result} />
      ))}
    </SearchResultsDisplayContainer>
  );
}

const SearchResultsDisplayContainer = styled.div`
  display: flex;
  flex-direct: columns;
  width: 100%;
`;
