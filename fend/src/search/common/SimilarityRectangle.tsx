import React from "react";
import styled from "styled-components";

interface SimilarityRectangleProps {
  similarity: number;
}

export default function SimilarityRectangle(props: SimilarityRectangleProps) {
  //TODO: Add opacity change
  console.log(props.similarity);
  return (
    <Rectangle
      style={{ background: `rgba(0, 0, 255, ${props.similarity})` }}
    ></Rectangle>
  );
}

const Rectangle = styled.div`
  height: 100%;
  width: 10px;
`;
