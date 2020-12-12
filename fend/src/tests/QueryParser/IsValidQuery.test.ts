import {
  isValidAttibute,
  isValidCombinator,
  isValidCommandStep,
  isValidOperation,
  isValidQuery,
  isValidValue
} from "../../operations/query/QueryValidator";

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
  const operations = ["body", "~"];
  const [isValid, error] = isValidOperation(operations, 1);
  expect(isValid).toBe(true);
});

test("- : isValidOperation : no previous command", () => {
  const operations = ["~"];
  const [isValid, error] = isValidOperation(operations, 0);
  expect(isValid).toBe(false);
  expect(error.toLowerCase()).toContain("missing attribute");
});

test("- : isValidOperation : operation not found", () => {
  const operations = ["body", "~ something like"];
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
  const combinator = "||";
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
    isValidCommandStep(['body ~ "hello word"'], 2)
  ).toThrowError("out-of-bounds");
});

test("+ : isValidStep : attribute", () => {
  const [isValid, error] = isValidCommandStep(
    ["body", "~", "state transitions"],
    0
  );
  expect(isValid).toBe(true);
});
test("+ : isValidStep : operation", () => {
  const [isValid, error] = isValidCommandStep(
    ["body", "~", "state transitions"],
    1
  );
  expect(isValid).toBe(true);
});

test("+ : isValidStep : value", () => {
  const [isValid, error] = isValidCommandStep(
    ["body", "~", "state transitions"],
    2
  );
  expect(isValid).toBe(true);
});

test("+ : isValidStep : combinator", () => {
  const [isValid, error] = isValidCommandStep(
    ["body", "~", "state transitions", "&&"],
    3
  );
  expect(isValid).toBe(true);
});

/*
 * isValidQuery
 */

test("+ : isValidQuery : empty", () => {
  const query = "";
  const [isValid, error] = isValidQuery(query);
  expect(isValid).toBe(true);
});

test("+ : isValidQuery : empty", () => {
  const query = "id = RE-8 || type = classes";
  const [isValid, error] = isValidQuery(query);
  expect(isValid).toBe(true);
});

test("- : isValidQuery : step parse error", () => {
  const query = 'body ~ "hello';
  const [isValid, error] = isValidQuery(query);
  expect(isValid).toBe(false);
  expect(error).toContain("closing quote");
});

test("- : isValidQuery : some step fails", () => {
  const query = 'body pig "hello"';
  const [isValid, error] = isValidQuery(query);
  expect(isValid).toBe(false);
  expect(error.toLowerCase()).toContain("operation");
});

test("- : isValidQuery : default", () => {
  const query = 'body ~ "hello"';
  const [isValid, error] = isValidQuery(query);
  expect(isValid).toBe(true);
});

test("- : isValidQuery : missing value", () => {
  const query = "body ~";
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
  const query = 'body ~ "hello" and';
  const [isValid, error] = isValidQuery(query);
  expect(isValid).toBe(false);
  expect(error.toLowerCase()).toContain("combinator");
});
