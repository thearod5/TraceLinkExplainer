// eslint-disable-next-line no-unused-vars
// eslint-disable-next-line no-unused-vars
import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { changeStep } from "../../redux/actions";
import { BORDER_LINE_EMPHASIS } from "../../styles/constants";

interface PageTitleProps {
  title: string;
  isSource: boolean;
}

function PageTitle(props: PageTitleProps) {
  const dispatch = useDispatch();

  const deselectArtifact = () => {
    const lastStep = props.isSource ? 1 : 2;
    dispatch(changeStep(lastStep, undefined));
  };

  return (
    <TitleContainer id="PageTitle" onClick={deselectArtifact}>
      <TitleText>{props.title}</TitleText>
    </TitleContainer>
  );
}

export const PAGE_NAP_HEIGHT = 60;
export const PAGE_NAV_MARGIN_TOP = 25;

export const TEXT_TOP_PADDING = 5;
export const TEXT_SIDE_PADDING = 15; ///px

// eslint-disable-next-line no-unused-vars
const TitleContainer = styled.div`
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
