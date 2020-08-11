import {
  AttributeValues,
  CategoricalOperations,
  getQueryRecommendations,
} from "../../components/search/QueryHelper";

test("+ : getRecommendations : attributes", () => {
  const query = "";
  const recommendations = getQueryRecommendations(query);

  for (let attributeIndex in AttributeValues) {
    expect(recommendations).toContain(AttributeValues[attributeIndex]);
  }
});

test("+ : getRecommendations : operations", () => {
  const query = "type";
  const recommendations = getQueryRecommendations(query);

  for (let catOperationIndex in CategoricalOperations) {
    expect(recommendations).toContain(CategoricalOperations[catOperationIndex]);
  }
});

test("+ : getRecommendations : operations", () => {
  const query = "type contains";
  const recommendations = getQueryRecommendations(query);
  expect(recommendations).toContain('""');
});

test("- : getRecommendations : operations", () => {
  const query = 'type contains "hello world" pig';
  const recommendations = getQueryRecommendations(query);
  expect(recommendations.length).toEqual(0);
});
