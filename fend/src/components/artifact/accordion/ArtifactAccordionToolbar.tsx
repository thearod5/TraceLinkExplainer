import { Checkbox, SvgIconTypeMap, Tooltip } from '@material-ui/core'
import { OverridableComponent } from '@material-ui/core/OverridableComponent'
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit'
import InvertColorsOffIcon from '@material-ui/icons/InvertColorsOff'
import ZoomInIcon from '@material-ui/icons/ZoomIn'
import ZoomOutIcon from '@material-ui/icons/ZoomOut'
import React from 'react'

export interface ToolbarButtonProps {
  iconElement: OverridableComponent<SvgIconTypeMap<{}, 'svg'>>;
  checked: boolean;
  onChange: (event: any) => void;
  name: string;
}

export function createToolbarIcons (
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
      name: 'increase font size'
    },
    {
      iconElement: ZoomOutIcon,
      checked: true,
      onChange: handleZoomOut,
      name: 'decrease font size'
    },
    {
      iconElement: FullscreenExitIcon,
      checked: sizeSelected,
      onChange: (event: any) => setSizeSelected(event.target.checked),
      name: 'toggle dynamic word size'
    },
    {
      iconElement: InvertColorsOffIcon,
      checked: colorSelected,
      onChange: (event: any) => setColorSelected(event.target.checked),
      name: 'toggle dynamic word color'
    }
  ]
  return icons.map((iconButton: ToolbarButtonProps, index: number) => {
    const { checked, onChange, name } = iconButton
    return (
      <Tooltip key={index} title={name}>
        <Checkbox

          checked={checked}
          checkedIcon={<iconButton.iconElement/>} // Compains if iconElement moved to deconstruction
          icon={<iconButton.iconElement />}
          onChange={onChange}
          color='primary'
        />
      </Tooltip>
    )
  })
}
