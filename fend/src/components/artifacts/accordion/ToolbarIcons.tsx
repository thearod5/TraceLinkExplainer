import FullscreenExitIcon from "@material-ui/icons/FullscreenExit";
import InvertColorsOffIcon from "@material-ui/icons/InvertColorsOff";
import ZoomInIcon from "@material-ui/icons/ZoomIn";
import ZoomOutIcon from "@material-ui/icons/ZoomOut";

export function generateIcons(
  handleZoomIn: any,
  handleZoomOut: any,
  colorSelected: any,
  setColorSelected: (arg0: boolean) => void,
  sizeSelected: any,
  setSizeSelected: (arg0: boolean) => void) {
  return [
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
}
