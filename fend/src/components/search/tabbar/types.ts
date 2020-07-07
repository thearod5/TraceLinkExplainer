import CategoryIcon from "@material-ui/icons/Category";
import CodeIcon from "@material-ui/icons/Code";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import SearchIcon from "@material-ui/icons/Search";
import { IconMetaType } from "./Tab";

export const Tabs: Record<string, IconMetaType> = {
  All: SearchIcon,
  Requirements: MenuBookIcon,
  Designs: CategoryIcon,
  Code: CodeIcon,
  Tasks: FormatListBulletedIcon,
};

export const TabKeys = Object.keys(Tabs);
