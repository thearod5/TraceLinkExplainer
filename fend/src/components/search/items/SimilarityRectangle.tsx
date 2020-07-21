import React from "react";
import styled from "styled-components";
import { BORDER_LINE } from "../../../styles/constants";

interface SimilarityRectangleProps {
  similarity: number;
}

//TODO: Add theme color
export default function SimilarityRectangle(props: SimilarityRectangleProps) {
  return (
    <Rectangle
      style={{ background: `rgba(0, 0, 255, ${props.similarity})` }}
    ></Rectangle>
  );
}

const Rectangle = styled.div`
  height: 100%;
  width: 10%;
  border-right: ${BORDER_LINE};
`;
