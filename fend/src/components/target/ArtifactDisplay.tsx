import React from "react";
import styled from "styled-components";
import { Artifact } from "../../../../shared/Dataset";

interface ArtifactDisplayProps {
  artifact: Artifact;
}

export default function ArtifactDisplay(props: ArtifactDisplayProps) {
  return (
    <ArtifactContainer>
      <h1>{props.artifact.id}</h1>
      <p>{props.artifact.body}</p>
    </ArtifactContainer>
  );
}

const ArtifactContainer = styled.div``;
