import {
  isValidCommand,
  isValidQuery,
} from "../../shared/queryparser/QueryHelper";

test("- : isValidStep : value", () => {
  const [isValid, error] = isValidCommand("hello word", 2);
  expect(isValid).toBe(false);
  expect(error).toContain("Word");
  expect(error).toContain("String");
});

test("+ : isValidStep : value", () => {
  const [isValid, error] = isValidCommand('"hello word"', 2);
  expect(isValid).toBe(true);
  expect(error).toContain("Word");
  expect(error).not.toContain("String");
});

test("+ : isValidQuery : body contains", () => {
  const query = 'body contains "hello world"';
  expect(isValidQuery(query)).toBeTruthy();
});

test("-  : isValidQuery : body contains", () => {
  const query = "body cnts hello";
  const [isValid, error] = isValidQuery(query);
  expect(isValid).toBe(false);
  expect(error.toLowerCase()).toContain("operation");
});

test("- : isValidQuery : body contains", () => {
  const query = "body contains hello worl-";
  const [isValid, error] = isValidQuery(query);
  expect(isValid).toBe(false);
  expect(error.toLowerCase()).toContain("wrapped");
});

test("+ : isValidQuery : id is", () => {
  const query = 'id is "RE-8"';
  const [isValid, error] = isValidQuery(query);
  expect(isValid).toBe(true);
});
