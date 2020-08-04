import React from "react";
import styled from "styled-components";
import { BORDER_LINE } from "../../../styles/constants";
import theme from "../../../styles/theme";

interface SimilarityRectangleProps {
  similarity: number;
}

//TODO: Add theme color
export default function SimilarityRectangle(props: SimilarityRectangleProps) {
  const hexAlpha = parseInt(
    (props.similarity * 255).toString(16),
    16
  ).toString();
  const color = theme.palette.primary.main + hexAlpha;
  return (
    <Rectangle
      style={{ background: `${color}` }} //TODO: Add primary color here
    ></Rectangle>
  );
}

const Rectangle = styled.div`
  height: 100%;
  width: 2%;
  border-right: ${BORDER_LINE};
`;
