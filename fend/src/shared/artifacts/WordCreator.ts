import { Artifact, ArtifactDisplayModel } from "../types/Dataset";
import {
  Families,
  FamilyColors,
  KeyWordType,
  SyntaxWordType,
  Word,
  WordDescriptor,
  WordDescriptors,
  Words
} from "../types/Trace";

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

export function getDefaultFamilies(): Families {
  const families: Families = {}
  families[SyntaxWordType] = {
    weight: 0,
    concepts: syntaxDelimiters,
    type: SyntaxWordType
  }
  families[KeyWordType] = {
    weight: 0,
    concepts: keyWordDelimiters,
    type: KeyWordType
  }

  return families
}

export function getDefaultFamilyColors(): FamilyColors {
  const colors: FamilyColors = {};
  colors[SyntaxWordType] = "#FF8C00";
  colors[KeyWordType] = "#79ADDC";
  colors[""] = "black";
  return colors;
}

export function createArtifactDisplayModel(
  artifact: Artifact,
  families: Families = getDefaultFamilies(),
  defaultSize: number = 1,
  familyColors: FamilyColors = getDefaultFamilyColors(),
  defaultColor: string = "black"
): ArtifactDisplayModel {
  const wordDescriptors = createDefaultWordDescriptors(artifact.body);
  const words = createWords(
    wordDescriptors,
    families,
    defaultSize,
    familyColors,
    defaultColor
  );
  return {
    artifact,
    words,
  };
}

/*
 * Default
 */

export function createDefaultWordDescriptors(body: string): WordDescriptors {
  return separateWords(body).map((bodyWord) => {
    return {
      families: getWordFamilies(bodyWord),
      word: bodyWord,
    };
  });
}

function getWordFamilies(word: string): string[] {
  if (syntaxDelimiters.includes(word)) return [SyntaxWordType];
  if (keyWordDelimiters.includes(word)) return [KeyWordType];
  else return [];
}

/*
 * Custom Words
 */
export function createWords(
  descriptors: WordDescriptors,
  families: Families,
  defaultSize: number,
  familyColors: FamilyColors,
  defaultColor: string = "black"
): Words {
  const createWordFromDescriptor = (descriptor: WordDescriptor) =>
    createWord(
      descriptor,
      families,
      defaultSize,
      familyColors,
      defaultColor
    );
  return descriptors.map(createWordFromDescriptor);
}

export function createWord(
  descriptor: WordDescriptor,
  families: Families,
  defaultSize: number,
  familyColors: FamilyColors,
  defaultColor: string
): Word {
  const hasFamily = descriptor.families.length > 0
  let wordSize, wordColor;
  if (hasFamily) {
    const mainFamilyId: string = descriptor.families[0]
    const mainFamily = families[mainFamilyId]

    wordSize = mainFamily.weight + defaultSize
    wordColor =
      mainFamilyId in familyColors
        ? familyColors[mainFamilyId]
        : defaultColor;
  } else {
    wordSize = defaultSize
    wordColor = defaultColor
  }

  return {
    word: descriptor.word,
    size: wordSize,
    color: wordColor,
    families: descriptor.families
  };
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
