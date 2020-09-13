import { objectContainsKeys } from "./TypeUtil";

export const SyntaxWordType: string = "#SYNTAX";
export const KeyWordType: string = "#KEYWORD";

/*
 * Type Definitions
 */

export interface TraceRetrievalPayload {
  datasetName: string;
  sourceId: string;
  sourceType: string;
  targetId: string;
  targetType: string;
}

export interface TraceInformation {
  families: Families;
  sourceDescriptors: WordDescriptors;
  targetDescriptors: WordDescriptors;
  traceType: string;
  score: number; // similarities score for when estimations are calculated
}

export type RelatedConcepts = string[];
export interface Family {
  weight: number
  concepts: RelatedConcepts
  type: "ROOT" | "CONCEPT" | typeof SyntaxWordType | typeof KeyWordType
}

export type Families = Record<string, Family>

export type WordDescriptors = WordDescriptor[];

//BEND Version of Word
export interface WordDescriptor {
  word: string;
  families: string[]
}

//FEND version of WordDescriptor
export interface Word {
  word: string;
  size: number;
  color: string;
  families: string[]
}

export type Words = Word[];

/*
 * Type Definitions
 */

export function isTraceRetrievealPayload(
  obj: object,
  log = false
): obj is TraceRetrievalPayload {
  const requiredKeys = [
    "datasetName",
    "sourceId",
    "sourceType",
    "targetId",
    "targetType",
  ];
  return objectContainsKeys(requiredKeys, obj, log);
}

export function isTraceInformation(
  obj: any,
  log = false
): obj is TraceInformation {
  const requiredKeys = [
    "families",
    "sourceDescriptors",
    "targetDescriptors",
    "traceType",
    "score",
  ];
  return (
    objectContainsKeys(requiredKeys, obj, log) &&
    isWordDescriptors(obj.sourceDescriptors, log) &&
    isWordDescriptors(obj.targetDescriptors, log)
  );
}

function isWordDescriptor(obj?: any, log = false): obj is WordDescriptor {
  const requiredKeys = ["word", "families"];
  const result =
    objectContainsKeys(requiredKeys, obj, log) &&
    typeof obj.word === "string" &&
    typeof obj.families === "object" &&
    obj.families.length >= 0;
  if (log && !result) console.log("Failed: ", obj);
  return result;
}

export function isWordDescriptors(
  obj?: any,
  log = false
): obj is WordDescriptors {
  if (!Array.isArray(obj)) return false;
  return !obj
    .map((wordDescriptor: any) => isWordDescriptor(wordDescriptor, log))
    .includes(false);
}

export type FamilyColors = Record<string, string>; //id to color mapping
