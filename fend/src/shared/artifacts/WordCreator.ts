import { FamilyColors, WordDescriptor } from "../types/Trace";

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

export function createDefaultWords(body: string): WordDescriptor[] {
  return separateWords(body).map((bodyWord) => {
    return {
      family: getWordFamily(bodyWord),
      word: bodyWord,
      weight: 0,
    };
  });
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

function splitWordsByDelimiter(words: string[], delimiter: string) {
  //Returns aggregated list of all words after each word is split
  let delimiterWords = [];
  for (let wordIndex = 0; wordIndex < words.length; wordIndex++) {
    let wordChildren = words[wordIndex].split(delimiter);
    for (let childIndex = 0; childIndex < wordChildren.length; childIndex++) {
      const word = wordChildren[childIndex];
      if (word !== "") delimiterWords.push(word);
      if (childIndex < wordChildren.length - 1) delimiterWords.push(delimiter);
    }
  }
  return delimiterWords;
}
