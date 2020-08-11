import { objectContainsKeys } from "./TypeUtil";

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
  families: string[];
  sourceWords: WordDescriptors;
  targetWords: WordDescriptors;
  traceType: string;
  score: number;
}

export type WordDescriptors = WordDescriptor[];

export interface WordDescriptor {
  word: string;
  family: string;
  weight: number;
}

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
    "sourceWords",
    "targetWords",
    "traceType",
    "score",
  ];
  return (
    objectContainsKeys(requiredKeys, obj, log) &&
    isWordDescriptors(obj.sourceWords, log) &&
    isWordDescriptors(obj.targetWords, log)
  );
}

function isWordDescriptor(obj?: any, log = false): obj is WordDescriptor {
  const requiredKeys = ["word", "family", "weight"];
  const result =
    objectContainsKeys(requiredKeys, obj, log) &&
    typeof obj.weight === "number" &&
    typeof obj.word === "string" &&
    typeof obj.family === "string";
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

export type FamilyColors = Record<string, string>;
