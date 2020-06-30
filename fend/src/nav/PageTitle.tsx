// eslint-disable-next-line no-unused-vars
// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { RootState } from "../redux";

export const HEIGHT_FROM_TOP_NUM = 25;
const HEIGHT_FROM_TOP = HEIGHT_FROM_TOP_NUM + "px";
const BORDER_LINE = "2px solid black";
const ICON_FONT_SIZE = "48px"; //TODO: why does this define the height of the bar
const TEXT_SIDE_PADDING = "15px";
const DEFAULT_TEXT = "Home";

//TODO: Replace hardcoded text with store
function PageTitle() {
  const metaData = useSelector((state: RootState) => state.metaData);

  const [isHovering, setIsHovering] = useState(false);
  let history = useHistory();

  return (
    <TitleContainer>
      <TitleText>
        {metaData.currentPage === "" ? DEFAULT_TEXT : metaData.currentPage}
      </TitleText>
    </TitleContainer>
  );
}

// eslint-disable-next-line no-unused-vars
const TitleContainer = styled.div`
  display: flex;
  flex-direct: row;
  align-items: stretch;
  margin-top: ${HEIGHT_FROM_TOP};
  position: absolute;
  left: 0px;
  top: 0px;
  z-index: -1;
`;

const TitleIconStyle = {
  height: "100%",
  fontSize: ICON_FONT_SIZE,
  borderTop: BORDER_LINE,
  borderRight: BORDER_LINE,
  borderBottom: BORDER_LINE,
};

const TitleText = styled.h1`
  margin: 0px;
  padding-left: ${TEXT_SIDE_PADDING};
  padding-right: ${TEXT_SIDE_PADDING};
  display: inline-block;
  border-top: ${BORDER_LINE};
  border-bottom: ${BORDER_LINE};
  border-right: ${BORDER_LINE};
`;

export default PageTitle;
