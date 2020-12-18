import { Checkbox, SvgIconTypeMap, Tooltip } from '@material-ui/core'
import { OverridableComponent } from '@material-ui/core/OverridableComponent'
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit'
import InvertColorsOffIcon from '@material-ui/icons/InvertColorsOff'
import ZoomInIcon from '@material-ui/icons/ZoomIn'
import ZoomOutIcon from '@material-ui/icons/ZoomOut'
import React from 'react'
import { Icons } from '../../../../constants'

export interface ToolbarButtonProps {
  iconElement: OverridableComponent<SvgIconTypeMap<{}, 'svg'>>;
  checked: boolean;
  onChange: (event: any) => void;
  description: string;
}

export function createToolbarIcons (
  handleZoomIn: any,
  handleZoomOut: any,
  colorSelected: any,
  setColorSelected: (arg0: boolean) => void,
  sizeSelected: any,
  setSizeSelected: (arg0: boolean) => void): Icons {
  const icons = [
    {
      iconElement: ZoomInIcon,
      checked: true,
      onChange: handleZoomIn,
      description: 'increase font size'
    },
    {
      iconElement: ZoomOutIcon,
      checked: true,
      onChange: handleZoomOut,
      description: 'decrease font size'
    },
    {
      iconElement: FullscreenExitIcon,
      checked: sizeSelected,
      onChange: (event: any) => setSizeSelected(event.target.checked),
      description: 'toggle dynamic word size'
    },
    {
      iconElement: InvertColorsOffIcon,
      checked: colorSelected,
      onChange: (event: any) => setColorSelected(event.target.checked),
      description: 'toggle dynamic word color'
    }
  ]
  return icons.map((iconButton: ToolbarButtonProps, index: number) => {
    const { checked, onChange, description } = iconButton
    return (
      <Tooltip key={index} title={description}>
        <Checkbox
          checked={checked}
          checkedIcon={<iconButton.iconElement/>} // Compains if iconElement moved to deconstruction
          icon={<iconButton.iconElement />}
          onChange={onChange}
          color='default'
        />
      </Tooltip>
    )
  })
}
