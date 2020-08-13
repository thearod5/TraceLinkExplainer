const TOO_MANY_QUOTES = "Too many quotes in word.";
const MISSING_END_QUOTE = "Expected closing quote.";

export function getStepsInQuery(query: string) {
  return combineStrings(query.split(" ")).filter((str) => str.length !== 0);
}

function combineStrings(words: string[]) {
  const combinedWords: string[] = [];
  let nextValidIndex = 0;

  for (let wordIndex = 0; wordIndex < words.length; wordIndex++) {
    if (wordIndex < nextValidIndex) continue;

    //No quotations
    let word = words[wordIndex];
    if (!word.includes('"')) {
      combinedWords.push(word);
      continue;
    }

    //Split quotations
    let subWords = word.split('"');

    if (subWords.length > 3) {
      throw Error(TOO_MANY_QUOTES);
    } else if (subWords.length === 3) {
      combinedWords.push(subWords[1]);
      continue;
    } else {
      nextValidIndex = combineMultiSpaceWord(
        words,
        subWords,
        wordIndex,
        combinedWords
      );
      continue;
    }
  }
  return combinedWords;
}
function combineMultiSpaceWord(
  words: string[],
  subWords: string[],
  wordIndex: number,
  combinedWords: string[]
) {
  const startIndex = wordIndex + 1;
  if (startIndex >= words.length) throw Error(MISSING_END_QUOTE);
  let wordComponents = [subWords[1]];
  for (
    let subWordIndex = startIndex;
    subWordIndex < words.length;
    subWordIndex++
  ) {
    let possibleLastIndex = processSubWordIndex(
      words,
      subWordIndex,
      wordComponents,
      combinedWords
    );
    if (possibleLastIndex === undefined) continue;
    return possibleLastIndex;
  }
  throw Error(MISSING_END_QUOTE);
}
function processSubWordIndex(
  words: string[],
  subWordIndex: number,
  wordComponents: string[],
  combinedWords: string[]
) {
  if (subWordIndex >= words.length) throw Error(MISSING_END_QUOTE);

  let subWord = words[subWordIndex];
  const quoteCount = quotesInWord(subWord);
  switch (quoteCount) {
    case 0:
      wordComponents.push(subWord);
      return undefined;
    case 1:
      if (!containsEndQuote(subWord)) throw MISSING_END_QUOTE;

      //combine word components and push
      wordComponents.push(subWord.substring(0, subWord.length - 1));
      const combinedWord = wordComponents.join(" ");
      combinedWords.push(combinedWord);
      return subWordIndex + 1;
    default:
      throw Error(TOO_MANY_QUOTES);
  }
}
function containsEndQuote(str: string) {
  return str[str.length - 1] === '"';
}
function quotesInWord(str: string) {
  return str.split('"').length - 1;
}
