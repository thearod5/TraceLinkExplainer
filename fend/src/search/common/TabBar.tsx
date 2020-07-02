import CategoryIcon from "@material-ui/icons/Category";
import CodeIcon from "@material-ui/icons/Code";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import SearchIcon from "@material-ui/icons/Search";
import React, { useState } from "react";
import styled from "styled-components";
import { BORDER_LINE } from "../../styles/constants";
import Tab, { IconMetaType } from "./Tab";

const TAB_BAR_TOP_MARGIN = 50;
const TAB_BAR_BOTTOM_PADDING = 5;
const DEFAULT_INDEX = 0;

export default function TabBar() {
  const Tabs: Record<string, IconMetaType> = {
    All: SearchIcon,
    Requirements: MenuBookIcon,
    Designs: CategoryIcon,
    Code: CodeIcon,
    Tasks: FormatListBulletedIcon,
  };

  const [selectedIndex, setSelectedIndex] = useState(DEFAULT_INDEX);
  return (
    <TabContainer>
      {Object.keys(Tabs).map((label, index) => (
        <Tab
          label={label}
          key={label}
          icon={Tabs[label]}
          selected={index === selectedIndex}
          onClick={() => setSelectedIndex(index)}
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
