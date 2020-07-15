// eslint-disable-next-line no-unused-vars
// eslint-disable-next-line no-unused-vars
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { RootState } from "../../redux";
import { BORDER_LINE_EMPHASIS } from "../../styles/constants";
import { HOME_ROUTE } from "./routes";

const DEFAULT_TEXT = "Home";

function PageTitle() {
  const metaData = useSelector((state: RootState) => state.metaData);

  //TODO: programmatically set the last back page
  return (
    <TitleContainer to={HOME_ROUTE} id="PageTitle">
      <TitleText>
        {metaData.currentPage === "" ? DEFAULT_TEXT : metaData.currentPage}
      </TitleText>
    </TitleContainer>
  );
}

export const PAGE_NAP_HEIGHT = 60;
export const PAGE_NAV_MARGIN_TOP = 25;

export const TEXT_TOP_PADDING = 5;
export const TEXT_SIDE_PADDING = 15; ///px

// eslint-disable-next-line no-unused-vars
const TitleContainer = styled(Link)`
  text-decoration: none;
  margin-top: ${PAGE_NAV_MARGIN_TOP}px;
  position: absolute;
  left: 0px;
  top: 0px;
  z-index: 5;
  color: black;
  background: white;
`;

const TitleText = styled.h1`
  margin: 0px;
  padding-top: ${TEXT_TOP_PADDING}px;
  padding-bottom: ${TEXT_TOP_PADDING}px;
  padding-left: ${TEXT_SIDE_PADDING}px;
  padding-right: ${TEXT_SIDE_PADDING}px;
  display: inline-block;
  border-top: ${BORDER_LINE_EMPHASIS};
  border-bottom: ${BORDER_LINE_EMPHASIS};
  border-right: ${BORDER_LINE_EMPHASIS};
`;

export default PageTitle;
