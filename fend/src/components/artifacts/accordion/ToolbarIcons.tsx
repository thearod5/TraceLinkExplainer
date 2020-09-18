import { Checkbox, SvgIconTypeMap } from "@material-ui/core";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";
import FullscreenExitIcon from "@material-ui/icons/FullscreenExit";
import InvertColorsOffIcon from "@material-ui/icons/InvertColorsOff";
import ZoomInIcon from "@material-ui/icons/ZoomIn";
import ZoomOutIcon from "@material-ui/icons/ZoomOut";
import React from "react";

export interface ToolbarButton {
  iconElement: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
  checked: boolean;
  onChange: (event: any) => void;
}

export function createToolbarIcons(
  handleZoomIn: any,
  handleZoomOut: any,
  colorSelected: any,
  setColorSelected: (arg0: boolean) => void,
  sizeSelected: any,
  setSizeSelected: (arg0: boolean) => void) {
  const icons = [
    {
      iconElement: ZoomInIcon,
      checked: true,
      onChange: handleZoomIn,
    },
    {
      iconElement: ZoomOutIcon,
      checked: true,
      onChange: handleZoomOut,
    },
    {
      iconElement: FullscreenExitIcon,
      checked: sizeSelected,
      onChange: (event: any) => setSizeSelected(event.target.checked),
    },
    {
      iconElement: InvertColorsOffIcon,
      checked: colorSelected,
      onChange: (event: any) => setColorSelected(event.target.checked),
    }
  ];
  return icons.map((iconButton: ToolbarButton, index: number) => {
    const { checked, onChange } = iconButton;
    return (
      <Checkbox
        key={index}
        checked={checked}
        color="primary"
        checkedIcon={<iconButton.iconElement color="primary" />} //Compains if iconElement moved to deconstruction
        icon={<iconButton.iconElement color="action" />}
        onChange={onChange}
      />
    );
  })
}
