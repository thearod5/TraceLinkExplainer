import React from "react";
import styled from "styled-components";
import { Artifact } from "../../../../shared/Dataset";
import { PAGE_NAV_MARGIN_TOP } from "../nav/PageTitle";

interface ArtifactDisplayProps {
  artifact: Artifact;
}

export default function ArtifactDisplay(props: ArtifactDisplayProps) {
  return (
    <ArtifactContainer>
      <ArtifactBody>{props.artifact.body}</ArtifactBody>
    </ArtifactContainer>
  );
}

const CONTAINER_TOP_PADDING = 100;
const CONTAINER_SIDE_PADDING = 10;

const ArtifactContainer = styled.div`
  margin-top: ${PAGE_NAV_MARGIN_TOP + CONTAINER_TOP_PADDING}px;
`;

const ArtifactBody = styled.p`
  margin-left: ${CONTAINER_SIDE_PADDING}px;
  margin-right: ${CONTAINER_SIDE_PADDING}px;
`;
