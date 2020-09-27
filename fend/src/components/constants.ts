import { WordDescriptorDisplay } from "../shared/types/Trace";

export const SELECT_SOURCE_MESSAGE = "See traced artifacts";
export const SELECT_TARGET_MESSAGE = "See traces explanations";
export const SEARCH_LIMIT = 100;
export const SEARCH_DISPLAY_LIMIT = 20;
export const NUMBER_RESULTS_PROMPT = " artifacts retrieved";

export const colors = [
  "CornFlowerBlue", "DarkSeaGreen", "DarkSalmon", "BlueViolet", "FireBrick",
  "Maroon", "DeepSkyBlue", "MediumOrchid", "Olive", "SpringGreen"]; //TODO: Add to theme

export const DEFAULT_FONT_COLOR = "black";
export const DEFAULT_FONT_SIZE = 1;
export const FONT_SIZE_DELTA = 0.2;

export type WordDescriptorDisplaySetter = React.Dispatch<React.SetStateAction<WordDescriptorDisplay | null>>
export type NumberSetter = (num: number) => void
export type ElementSetter = (value: React.SetStateAction<JSX.Element | null>) => void

export const SELECT_DATASET_STEP = 0;
export const SELECT_SOURCE_STEP = 1;
export const SELECT_TARGET_STEP = 2;
export const VIEW_TRACE_STEP = 3;
export const FIRST_STEP_IN_WIZARD = SELECT_SOURCE_STEP;

export const HOME_ROUTE = "/"; // page 0 (not defined in prototype)
export const DATASET_ROUTE = "/dataset"; //page 1
export const SELECT_SOURCE_ARTIFACTS = "/selectsources";
export const SELECT_TARGET_ARTIFACTS = "/selecttargets"
export const TRACE_VIEW_ROUTE = "/trace"; //page 4

export const FADE_TIMEOUT = 500 //ms

export type StartSearchCallback = (searchString: string, limit?: number) => void
export type VoidCallback = () => void