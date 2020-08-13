import {
  isValidAttibute,
  isValidCombinator,
  isValidCommandStep,
  isValidOperation,
  isValidQuery,
  isValidValue,
} from "../../shared/query/QueryValidator";

/*
 * isValidAttribute
 */
test("+ : isValidAttibute : default", () => {
  const attribute = "type";
  const [isValid, error] = isValidAttibute(attribute);
  expect(isValid).toBe(true);
});

test("+ : isValidAttibute : case insensitive", () => {
  const attribute = "TyPe";
  const [isValid, error] = isValidAttibute(attribute);
  expect(isValid).toBe(true);
});

test("- : isValidAttibute : non attribute", () => {
  const attribute = "pig";
  const [isValid, error] = isValidAttibute(attribute);
  expect(isValid).toBe(false);
  expect(error).toContain("is not a Value");
});

/*
 * isValidOperatoin
 */

test("+ : isValidOperation : categorical attribute", () => {
  const operations = ["body", "contains"];
  const [isValid, error] = isValidOperation(operations, 1);
  expect(isValid).toBe(true);
});

test("- : isValidOperation : no previous command", () => {
  const operations = ["contains"];
  const [isValid, error] = isValidOperation(operations, 0);
  expect(isValid).toBe(false);
  expect(error.toLowerCase()).toContain("missing attribute");
});

test("- : isValidOperation : operation not found", () => {
  const operations = ["body", "contains something like"];
  const [isValid, error] = isValidOperation(operations, 1);
  expect(isValid).toBe(false);
  expect(error.toLowerCase()).toContain("unknown operation");
});

/*
 * isValidValue
 */

test("+ : isValidValue : default", () => {
  const value = "state transitions";
  const [isValid, error] = isValidValue(value);
  expect(isValid).toBe(true);
});

test("- : isValidValue : empty", () => {
  const value = "";
  const [isValid, error] = isValidValue(value);
  expect(isValid).toBe(false);
  expect(error).toContain("empty");
});

test("- : isValidValue : contains quote", () => {
  const value = '"state transitions"';
  const [isValid, error] = isValidValue(value);
  expect(isValid).toBe(false);
  expect(error).toContain("parse");
});

/*
 * isValidCombinator
 */

test("+ : isValidCombinator : default", () => {
  const combinator = "and";
  const [isValid, error] = isValidCombinator(combinator);
  expect(isValid).toBe(true);
});

test("+ : isValidCombinator : default (case ignored)", () => {
  const combinator = "AnD";
  const [isValid, error] = isValidCombinator(combinator);
  expect(isValid).toBe(true);
});

test("- : isValidCombinator : not a combinator", () => {
  const combinator = "pig";
  const [isValid, error] = isValidCombinator(combinator);
  expect(isValid).toBe(false);
  expect(error.toLowerCase()).toContain("not a combinator");
});

/*
 * isValidCommandStep
 */

test("- : isValidStep : index out of bounds", () => {
  expect(() =>
    isValidCommandStep(['body contains "hello word"'], 2)
  ).toThrowError("out-of-bounds");
});

test("+ : isValidStep : attribute", () => {
  const [isValid, error] = isValidCommandStep(
    ["body", "contains", "state transitions"],
    0
  );
  expect(isValid).toBe(true);
});
test("+ : isValidStep : operation", () => {
  const [isValid, error] = isValidCommandStep(
    ["body", "contains", "state transitions"],
    1
  );
  expect(isValid).toBe(true);
});

test("+ : isValidStep : value", () => {
  const [isValid, error] = isValidCommandStep(
    ["body", "contains", "state transitions"],
    2
  );
  expect(isValid).toBe(true);
});

test("+ : isValidStep : combinator", () => {
  const [isValid, error] = isValidCommandStep(
    ["body", "contains", "state transitions", "and"],
    3
  );
  expect(isValid).toBe(true);
});

/*
 * isValidQuery
 */

test("- : isValidQuery : step parse error", () => {
  const query = 'body contains "hello';
  const [isValid, error] = isValidQuery(query);
  expect(isValid).toBe(false);
  expect(error).toContain("closing quote");
});

test("+ : isValidQuery : empty", () => {
  const query = "";
  const [isValid, error] = isValidQuery(query);
  expect(isValid).toBe(true);
});

test("- : isValidQuery : some step fails", () => {
  const query = 'body pig "hello"';
  const [isValid, error] = isValidQuery(query);
  expect(isValid).toBe(false);
  expect(error.toLowerCase()).toContain("operation");
});

test("- : isValidQuery : default", () => {
  const query = 'body contains "hello"';
  const [isValid, error] = isValidQuery(query);
  expect(isValid).toBe(true);
});

test("- : isValidQuery : missing value", () => {
  const query = "body contains";
  const [isValid, error] = isValidQuery(query);
  expect(isValid).toBe(false);
  expect(error.toLowerCase()).toContain("missing value");
});

test("- : isValidQuery : missing operation", () => {
  const query = "body";
  const [isValid, error] = isValidQuery(query);
  expect(isValid).toBe(false);
  expect(error.toLowerCase()).toContain("missing operation");
});

test("- : isValidQuery : missing combinator right term", () => {
  const query = 'body contains "hello" and';
  const [isValid, error] = isValidQuery(query);
  expect(isValid).toBe(false);
  expect(error.toLowerCase()).toContain("combinator");
});
