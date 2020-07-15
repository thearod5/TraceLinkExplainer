import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import styled from "styled-components";
import { Artifact } from "../../../../shared/Dataset";
import { PAGE_NAV_MARGIN_TOP } from "../nav/PageTitle";

interface ArtifactDisplayProps {
  artifact: Artifact;
}

export default function ArtifactDisplay(props: ArtifactDisplayProps) {
  let body;

  if (props.artifact.type === "Classes") {
    body = (
      <SyntaxHighlighter
        language="java" //TODO: Dynamically set this field
        showLineNumbers
        style={docco}
        customStyle={{ background: "none" }}
      >
        {props.artifact.body}
      </SyntaxHighlighter>
    );
  } else {
    body = <ArtifactBody>{props.artifact.body}</ArtifactBody>;
  }
  return <ArtifactContainer>{body}</ArtifactContainer>;
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
