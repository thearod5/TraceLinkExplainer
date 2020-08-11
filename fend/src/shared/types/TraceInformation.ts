import { objectContainsKeys } from "./TypeUtil";
/*
 * Type Definitions
 */

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
