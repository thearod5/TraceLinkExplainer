import { FamilyColors, WordDescriptor } from "../../../../../shared/Dataset";

const SyntaxWordType = "#SYNTAX";
const KeyWordType = "#KEYWORD";

const delimiters = [" ", "\n", "\t", ".", ";"];
const keyWordDelimiters = [
  "public",
  "private",
  "protected",
  "static",
  "package",
  "switch",
  "default",
  "import",
  "class",
  "void",
  "try",
  "catch",
  "interface",
  "extends",
  "implements",
  "for",
  "if",
];
const syntaxDelimiters = ["{", "}"];

function getWordFamily(word: string) {
  if (syntaxDelimiters.includes(word)) return SyntaxWordType;
  if (keyWordDelimiters.includes(word)) return KeyWordType;
  else return "";
}

export function getDefaultFamilyColors(): FamilyColors {
  const colors: FamilyColors = {};
  colors[SyntaxWordType] = "#FF9505";
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

export function separateWords(body: string): string[] {
  let words: string[] = [body];

  for (
    let delimiterIndex = 0;
    delimiterIndex < delimiters.length;
    delimiterIndex++
  ) {
    let delimiterWords = [];
    for (let wordIndex = 0; wordIndex < words.length; wordIndex++) {
      let delimiter = delimiters[delimiterIndex];
      let wordChildren = words[wordIndex].split(delimiter);
      for (let childIndex = 0; childIndex < wordChildren.length; childIndex++) {
        delimiterWords.push(wordChildren[childIndex]);
        if (childIndex < wordChildren.length - 1)
          delimiterWords.push(delimiter);
      }
    }
    words = delimiterWords;
  }
  return words;
}
