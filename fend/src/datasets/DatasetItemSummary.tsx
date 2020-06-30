import React from "react";
import styled from "styled-components";

interface DataItemSummaryProps {
  dataset: string;
  isSelected: boolean;
  clickHandler: () => void;
}

const selectedColor = "blue"; //TODO: Set to theme colors
const unselectedColor = "grey";

function DataItemSummary(props: DataItemSummaryProps) {
  return (
    <ItemContainer onClick={props.clickHandler}>
      <HighlightBar
        style={{ background: props.isSelected ? selectedColor : undefined }}
      ></HighlightBar>
      <ItemLabel>{props.dataset}</ItemLabel>
    </ItemContainer>
  );
}

const BORDER = "1px solid black";
const ROW_HEIGHT = "40px";
const HIGHLIGHT_BAR_WIDTH = "10px";

const ItemContainer = styled.div`
  display: flex;
  flex-direct: row;
  height: ${ROW_HEIGHT};
  border-left: ${BORDER};
  border-right: ${BORDER};
  border-bottom: ${BORDER};
`;

const ItemLabel = styled.h3`
  padding: 0px;
  margin: 0px;
  width: 100%;
  display: inline-block;
  text-align: left;
`;

const HighlightBar = styled.div`
  height: 100%;
  width: ${HIGHLIGHT_BAR_WIDTH};
  background: ${unselectedColor};
`;

export default DataItemSummary;
