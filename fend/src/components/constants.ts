import { WordDescriptorDisplay } from "../shared/types/Trace";

export const SELECT_SOURCE_MESSAGE = "See traced artifacts";
export const SELECT_TARGET_MESSAGE = "See traces explanations";
export const SEARCH_LIMIT = 100;
export const SEARCH_DISPLAY_LIMIT = 20;
export const NUMBER_RESULTS_PROMPT = " artifacts retrieved";

export const colors = [
  "CornFlowerBlue", "DarkSeaGreen", "DarkSalmon", "BlueViolet", "FireBrick", "LightGreen",
  "Maroon", "DeepSkyBlue", "MediumOrchid", "Olive", "SpringGreen"]; //TODO: Add to theme

export const DEFAULT_FONT_COLOR = "black";
export const DEFAULT_FONT_SIZE = 1;
export const FONT_SIZE_DELTA = 0.2;

export type WordDescriptorDisplaySetter = React.Dispatch<React.SetStateAction<WordDescriptorDisplay | null>>
export type NumberSetter = (num: number) => void
export type ElementSetter = (value: React.SetStateAction<JSX.Element>) => void