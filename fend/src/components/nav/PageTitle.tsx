// eslint-disable-next-line no-unused-vars
// eslint-disable-next-line no-unused-vars
import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { changeStep } from "../../redux/actions";
import {
  SELECT_SOURCE_STEP,
  SELECT_TARGET_STEP,
} from "../../shared/pagechanger/constants";

interface PageTitleProps {
  title: string;
  isSource: boolean;
}

function PageTitle(props: PageTitleProps) {
  const dispatch = useDispatch();

  const deselectArtifact = () => {
    const lastStep = props.isSource ? SELECT_SOURCE_STEP : SELECT_TARGET_STEP;
    dispatch(changeStep(lastStep));
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
  width: 100%;
  text-align: center;
  padding: ${TEXT_TOP_PADDING}px ${TEXT_SIDE_PADDING}px
  display: inline-block;
`;

export default PageTitle;
