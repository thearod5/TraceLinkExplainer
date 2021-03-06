import { createBrowserHistory } from 'history'
import { Artifact, Project } from './Project'
import { Trace, WordDescriptorDisplay } from './Trace'
import { TracedArtifacts } from './TracedArtifacts'
/*
 * Search
 */
export const SELECT_SOURCE_MESSAGE = 'See traced artifacts'
export const SELECT_TARGET_MESSAGE = 'See traces explanations'
export const SEARCH_LIMIT = 100
export const MAX_SEARCH_RESULTS_PER_PAGE = 15
export const NUMBER_RESULTS_PROMPT = ' artifacts retrieved'
export type SuggestionFunctionType = (
  query: string,
  limit: number
) => Promise<Artifact[]>;
/*
 * Words
 */
export const colors = [
  'CornFlowerBlue', 'DarkSeaGreen', 'DarkSalmon', 'BlueViolet', 'FireBrick',
  'Maroon', 'DeepSkyBlue', 'MediumOrchid', 'Olive', 'SpringGreen'] // TODO: Add to theme

export const DEFAULT_FONT_COLOR = 'black'
export const DEFAULT_FONT_SIZE = 1
export const FONT_SIZE_DELTA = 0.2

export const NOT_CACHED = -2
export const UNSELECTED_INDEX = -1

/*
 * API
 */
export const SELECT_DATASET_STEP = 0
export const SELECT_SOURCE_STEP = 1
export const SELECT_TARGET_STEP = 2
export const VIEW_TRACE_STEP = 3
export const FIRST_STEP_IN_WIZARD = SELECT_SOURCE_STEP

export const HOME_ROUTE = '/' // page 0 (not defined in prototype)
export const DATASET_ROUTE = '/project' // page 1
export const SELECT_SOURCES_ROUTE = '/selectsources'
export const SELECT_TARGETS_ROUTE = '/selecttargets'
export const VIEW_TRACE_ROUTE = '/trace' // page 4

export const FADE_TIMEOUT = 500 // ms

/*
 *
 */
export type VoidCallback = () => void
export type StartSearchCallback = (searchString: string, limit?: number) => void
export type StringCallback = (str: string) => void
export type OptionalStringCallback = (str: string | undefined) => void
export type ArtifactCallback = (artifact: Artifact) => void
export type TracesSetCallback = (trace: TracedArtifacts[]) => void
export type TraceCallback = (trace: Trace) => void
export type IndexCallback = (index: number) => void
export type DatasetCallback = (project : Project) => void
/*
 * Types
 */
export type WordDescriptorDisplaySetter = React.Dispatch<React.SetStateAction<WordDescriptorDisplay | null>>
export type NumberSetter = (num: number) => void
export type ElementSetter = (value: React.SetStateAction<JSX.Element | null>) => void
export type BooleanSetter = (num: boolean) => void;
export type ArtifactsSetter = (artifacts: Artifact[]) => void;
export type MUICallback = ((event: React.ChangeEvent<{}>, expanded: boolean) => void) | undefined
export type Icon = JSX.Element
export type Icons = Icon[]

export const appHistory = createBrowserHistory()
