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
}

const TAB_ITEM_SELECTED_COLOR = "blue";

export default function Tab(props: ArtifactTabProps) {
  return (
    <TabContainer onClick={() => props.onClick()}>
      <TabItem
        style={{ color: props.selected ? TAB_ITEM_SELECTED_COLOR : undefined }}
      >
        <label>{props.label}</label>
      </TabItem>
      <TabItem>
        <props.icon
          style={{
            height: CONTAINER_HEIGHT,
          }}
          color={props.selected ? "primary" : undefined}
        />
      </TabItem>
    </TabContainer>
  );
}

const TabContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: ${CONTAINER_HEIGHT}px;
`;

const TabItem = styled.div`
  height: 100%,
  display: inline-block;
  border: 1px solid back;
  margin-left: ${TAB_ITEM_SIDE_MARGIN}px;
  margin-right: ${TAB_ITEM_SIDE_MARGIN}px;
`;
