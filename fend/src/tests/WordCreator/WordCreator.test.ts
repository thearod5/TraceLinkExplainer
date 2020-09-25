import {
  createDefaultWordDescriptors,
  splitWordsByDelimiter
} from "../../shared/artifacts/WordCreator";
import { KeyWordType, SyntaxWordType, WordDescriptor } from "../../shared/types/Trace";

test("dummy test", () => {
  const document = "function(int count)";
  const documentWords = ["function", "(", "int", " ", "count", ")"];
  const requiredFamilies = [SyntaxWordType, KeyWordType];

  //Body
  const words: WordDescriptor[] = createDefaultWordDescriptors(document);

  //Assertions
  const familiesInWords = [];
  for (let wordIndex in words) {
    const word: WordDescriptor = words[wordIndex];

    expect(word.word).not.toStrictEqual("");
    expect(documentWords).toContain(word.word);
    for (let wordFamilyIndex in word.relationshipIds)
      familiesInWords.push(word.relationshipIds[wordFamilyIndex]);
  }

  for (let requiredFamilyIndex in requiredFamilies) {
    expect(familiesInWords).toContain(requiredFamilies[requiredFamilyIndex]);
  }
});

test("+ : splitWordsByDelimiter : space", () => {
  const words = splitWordsByDelimiter(
    ["command body", "hello world"],
    " ",
    false
  );
  expect(words.length).toBe(4);
  expect(words[0]).toBe("command");
  expect(words[1]).toBe("body");
  expect(words[2]).toBe("hello");
  expect(words[3]).toBe("world");
});
