import { SvgIconTypeMap } from "@material-ui/core";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";
import React from "react";
import styled from "styled-components";

const CONTAINER_HEIGHT = 25;
const TAB_ITEM_SIDE_MARGIN = 5;

export type IconMetaType = OverridableComponent<SvgIconTypeMap<{}, "svg">>;

interface ArtifactTabProps {
  label: string;
  icon: IconMetaType;
  selected: boolean;
  onClick: () => void;
  numberOfResults: number;
}

export default function Tab(props: ArtifactTabProps) {
  const numberOfResultsIdentifier =
    props.numberOfResults === undefined ||
    props.numberOfResults === 0 ? null : (
      <TabItem>({props.numberOfResults})</TabItem>
    );
  return (
    <TabContainer
      onClick={props.onClick}
      style={{ borderBottom: props.selected ? "2px solid blue" : "none" }}
    >
      <TabRow>
        <props.icon color={props.selected ? "primary" : undefined} />
      </TabRow>
      <TabItem
        style={{ color: props.selected ? TAB_ITEM_SELECTED_COLOR : undefined }}
      >
        <label>
          {props.label}
          {numberOfResultsIdentifier}
        </label>
      </TabItem>
    </TabContainer>
  );
}
const TAB_SIDE_MARGIN = 15;
const TAB_BOTTOM_PADDING = 5;
const TAB_ITEM_SELECTED_COLOR = "blue";

const TabContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: ${TAB_SIDE_MARGIN}px;
  margin-left: ${TAB_SIDE_MARGIN}px;
  padding-bottom: ${TAB_BOTTOM_PADDING}px;
`;

const TabRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const TabItem = styled.div``;
