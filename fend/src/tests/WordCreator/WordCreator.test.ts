import {
  createDefaultWords,
  KeyWordType,
  SyntaxWordType,
} from "../../shared/artifacts/WordCreator";
import { WordDescriptor } from "../../shared/types/TraceInformation";

test("dummy test", () => {
  const document = "function(int count)";
  const documentWords = ["function", "(", "int", " ", "count", ")"];
  const requiredFamilies = [SyntaxWordType, KeyWordType, ""];

  //Body
  const words: WordDescriptor[] = createDefaultWords(document);

  //Assertions
  const familiesInWords = [];
  for (let wordIndex in words) {
    const word: WordDescriptor = words[wordIndex];

    expect(word.weight).toEqual(0);
    expect(word.word).not.toStrictEqual("");
    expect(documentWords).toContain(word.word);
    familiesInWords.push(word.family);
  }

  for (let requiredFamilyIndex in requiredFamilies) {
    expect(familiesInWords).toContain(requiredFamilies[requiredFamilyIndex]);
  }
});
