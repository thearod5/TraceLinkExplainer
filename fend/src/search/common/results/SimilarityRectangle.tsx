import React from "react";
import styled from "styled-components";
import { BORDER_LINE } from "../../../styles/constants";
import { SEARCH_RESULT_ITEM_HEIGHT } from "./constants";

interface SimilarityRectangleProps {
  similarity: number;
}

const SIMILARITY_RECTANGLE_WIDTH = 25;

//TODO: Add theme color
export default function SimilarityRectangle(props: SimilarityRectangleProps) {
  return (
    <Rectangle
      style={{ background: `rgba(0, 0, 255, ${props.similarity})` }}
    ></Rectangle>
  );
}

const Rectangle = styled.div`
  height: ${SEARCH_RESULT_ITEM_HEIGHT}px;
  width: ${SIMILARITY_RECTANGLE_WIDTH}px;
  border-right: ${BORDER_LINE};
`;
