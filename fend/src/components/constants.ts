import { WordDescriptorDisplay } from "../shared/types/Trace";

export const colors = [
  "CornFlowerBlue", "DarkSeaGreen", "DarkSalmon", "BlueViolet", "FireBrick", "LightGreen",
  "Maroon", "DeepSkyBlue", "MediumOrchid", "Olive", "SpringGreen"]; //TODO: Add to theme

export const DEFAULT_FONT_COLOR = "black";
export const DEFAULT_FONT_SIZE = 1;
export const FONT_SIZE_DELTA = 0.2;

export type WordDescriptorDisplaySetter = React.Dispatch<React.SetStateAction<WordDescriptorDisplay | null>>
