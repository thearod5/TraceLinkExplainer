import React, { useState } from "react";
import styled from "styled-components";
import { BORDER_LINE } from "../../styles/constants";

interface DataItemSummaryProps {
  dataset: string;
  isSelected: boolean;
  clickHandler: () => void;
}

const selectedColor = "blue"; //TODO: Set to theme colors
const unselectedColor = "grey";
const onHoverColor = "lightblue";

function DataItemSummary(props: DataItemSummaryProps) {
  const [hover, setHover] = useState(false);

  return (
    <ItemContainer
      onClick={props.clickHandler}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ background: hover ? onHoverColor : undefined }}
    >
      <HighlightBar
        style={{ background: props.isSelected ? selectedColor : undefined }}
      ></HighlightBar>
      <ItemLabel>{props.dataset}</ItemLabel>
    </ItemContainer>
  );
}

const ROW_HEIGHT = "40px";
const HIGHLIGHT_BAR_WIDTH = "10px";

const ItemContainer = styled.div`
  display: flex;
  flex-direct: row;
  height: ${ROW_HEIGHT};
  border-left: ${BORDER_LINE};
  border-right: ${BORDER_LINE};
  border-bottom: ${BORDER_LINE};
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
