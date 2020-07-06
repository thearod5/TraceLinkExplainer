import React from "react";
import styled from "styled-components";
import { BORDER_LINE } from "../../../styles/constants";
import Tab, { IconMetaType } from "./Tab";

const TAB_BAR_TOP_MARGIN = 50;
const TAB_BAR_BOTTOM_PADDING = 5;

interface TabBarProps {
  selectedIndex: number;
  setSelectedIndex: (index: number) => void;
  tabs: Record<string, IconMetaType>;
}

export default function TabBar(props: TabBarProps) {
  return (
    <TabContainer>
      {Object.keys(props.tabs).map((label, index) => (
        <Tab
          label={label}
          key={label}
          icon={props.tabs[label]}
          selected={index === props.selectedIndex}
          onClick={() => props.setSelectedIndex(index)}
        />
      ))}
    </TabContainer>
  );
}

const TabContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direct: row;
  justify-content: space-around;
  margin-top: 25px;
  padding-bottom: ${TAB_BAR_BOTTOM_PADDING}px;
  border-bottom: ${BORDER_LINE};
  margin-top: ${TAB_BAR_TOP_MARGIN}px;
`;
