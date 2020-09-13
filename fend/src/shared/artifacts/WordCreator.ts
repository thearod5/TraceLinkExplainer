import { Artifact, ArtifactDisplayModel } from "../types/Dataset";
import {
  FamilyColors,
  Word,
  WordDescriptor,
  WordDescriptors,
  Words
} from "../types/Trace";

export const SyntaxWordType = "#SYNTAX";
export const KeyWordType = "#KEYWORD";

const syntaxDelimiters = ["{", "}", "(", ")", "[", "]"];
const lineDelimiters = [" ", "\n", "\t"].concat(syntaxDelimiters);
const keyWordDelimiters = [
  "function",
  "public",
  "private",
  "protected",
  "final",
  "static",
  "package",
  "switch",
  "default",
  "import",
  "new",
  "class",
  "void",
  "try",
  "catch",
  "interface",
  "extends",
  "implements",
  "for",
  "if",
  "int",
  "double",
  "float",
  "string",
];

export function getDefaultFamilyColors(): FamilyColors {
  const colors: FamilyColors = {};
  colors[SyntaxWordType] = "#FF8C00";
  colors[KeyWordType] = "#79ADDC";
  colors[""] = "black";
  return colors;
}

export function createArtifactDisplayModel(
  artifact: Artifact,
  sizeSelected: boolean = true,
  colorSelected: boolean = true,
  defaultSize: number = 1,
  familyColors: FamilyColors = getDefaultFamilyColors(),
  defaultColor: string = "black"
): ArtifactDisplayModel {
  const wordDescriptors = createDefaultWordDescriptors(artifact.body);
  const words = createWords(
    wordDescriptors,
    sizeSelected,
    colorSelected,
    defaultSize,
    familyColors,
    defaultColor
  );
  return {
    artifact,
    words,
  };
}

export function createDefaultWordDescriptors(body: string): WordDescriptors {
  return separateWords(body).map((bodyWord) => {
    return {
      family: getWordFamily(bodyWord),
      word: bodyWord,
      weight: 0,
    };
  });
}

export function createWords(
  descriptors: WordDescriptors,
  sizeSelected: boolean,
  colorSelected: boolean,
  defaultSize: number,
  familyColors: FamilyColors,
  defaultColor: string = "black"
): Words {
  const createWordFromDescriptor = (descriptor: WordDescriptor) =>
    createWord(
      descriptor,
      sizeSelected,
      colorSelected,
      defaultSize,
      familyColors,
      defaultColor
    );
  return descriptors.map(createWordFromDescriptor);
}

export function createWord(
  descriptor: WordDescriptor,
  sizeSelected: boolean,
  colorSelected: boolean,
  defaultSize: number,
  familyColors: FamilyColors,
  defaultColor: string = "black"
): Word {
  const wordSize = calculateWordSize(
    descriptor.weight,
    sizeSelected,
    defaultSize
  );
  const wordColor =
    descriptor.family in familyColors && colorSelected
      ? familyColors[descriptor.family]
      : defaultColor;
  return {
    word: descriptor.word,
    size: wordSize,
    color: wordColor,
    description: createWordDescription(descriptor),
    family: descriptor.family
  };
}

function createWordDescription(descriptor: WordDescriptor) {
  //newlines are separated inside of ArtifactWords.tsx
  if (descriptor.weight === 0) //TODO: Fells dirty
    return ""
  return `Family: ${descriptor.family}\nWeight: ${descriptor.weight}`
}

function calculateWordSize(
  weight: number,
  sizeSelected: boolean,
  defaultSize: number
) {
  return sizeSelected ? weight + defaultSize : defaultSize;
}

function getWordFamily(word: string) {
  if (syntaxDelimiters.includes(word)) return SyntaxWordType;
  if (keyWordDelimiters.includes(word)) return KeyWordType;
  else return "";
}

export function separateWords(body: string): string[] {
  let words: string[] = [body];

  for (
    let delimiterIndex = 0;
    delimiterIndex < lineDelimiters.length;
    delimiterIndex++
  ) {
    let delimiter = lineDelimiters[delimiterIndex];
    words = splitWordsByDelimiter(words, delimiter);
  }
  return words;
}

export function splitWordsByDelimiter(
  words: string[],
  delimiter: string,
  addDelimiter = true
) {
  //Returns aggregated list of all words after each word is split
  let delimiterWords = [];
  for (let wordIndex = 0; wordIndex < words.length; wordIndex++) {
    let wordChildren = words[wordIndex].split(delimiter);
    for (let childIndex = 0; childIndex < wordChildren.length; childIndex++) {
      const word = wordChildren[childIndex];
      if (word !== "") delimiterWords.push(word);
      if (childIndex < wordChildren.length - 1 && addDelimiter)
        delimiterWords.push(delimiter);
    }
  }
  return delimiterWords;
}
