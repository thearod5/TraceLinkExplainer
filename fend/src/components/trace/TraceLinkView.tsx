import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Artifact } from "../../../../shared/Dataset";
import { RootState } from "../../redux";
import { newPage } from "../../redux/actions";
import { BORDER_LINE_EMPHASIS } from "../../styles/constants";
import {
  PAGE_NAV_MARGIN_TOP,
  TEXT_SIDE_PADDING,
  TEXT_TOP_PADDING,
} from "../nav/PageTitle";

export default function TraceLinkView() {
  const dispatch = useDispatch();
  const targetArtifact: Artifact = useSelector(
    (state: RootState) => state.metaData.targetArtifact
  );
  const sourceArtifact: Artifact = useSelector(
    (state: RootState) => state.metaData.sourceArtifact
  );
  dispatch(newPage(sourceArtifact.id));

  const nextLink = `/artifacts/${targetArtifact.id}`;
  return (
    <TraceLinkContainer>
      <TraceLine />
      <TargetArtifactContainer to={nextLink}>
        <TargetArtifactText>{targetArtifact.id}</TargetArtifactText>
      </TargetArtifactContainer>
    </TraceLinkContainer>
  );
}

const TraceLinkContainer = styled.div`
  width: 100%;
`;

const PAGE_NAV_HEIGHT = 50;
const PAGE_NAV_MAX_WIDTH = 200;

const TraceLine = styled.hr`
  margin-top: ${PAGE_NAV_MARGIN_TOP + PAGE_NAV_HEIGHT / 2}px;
  margin-right: ${PAGE_NAV_MAX_WIDTH}px;
  margin-left: ${PAGE_NAV_MAX_WIDTH}px;
  color: black;
  background-color: black;
  border: 2px solid black;
`;

const TargetArtifactContainer = styled(Link)`
  text-decoration: none;
  margin-top: ${PAGE_NAV_MARGIN_TOP}px;
  position: absolute;
  right: 0px;
  top: 0px;
  z-index: 0;
  color: blue;
`;

const TargetArtifactText = styled.h1`
  margin: 0px;
  padding-top: ${TEXT_TOP_PADDING}px;
  padding-bottom: ${TEXT_TOP_PADDING}px;
  padding-left: ${TEXT_SIDE_PADDING}px;
  padding-right: ${TEXT_SIDE_PADDING}px;
  display: inline-block;
  border-top: ${BORDER_LINE_EMPHASIS};
  border-bottom: ${BORDER_LINE_EMPHASIS};
  border-left: ${BORDER_LINE_EMPHASIS};
`;
