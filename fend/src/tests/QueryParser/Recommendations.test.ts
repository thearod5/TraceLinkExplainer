import {
  ATTRIBUTE_VALUES,
  CATEGORICAL_OPERATIONS,
} from "../../components/search/QueryHelper";
import { getQueryRecommendations } from "../../components/search/QueryRecommender";

test("+ : getRecommendations : attributes", () => {
  const query = "";
  const recommendations = getQueryRecommendations(query);

  for (let attributeIndex in ATTRIBUTE_VALUES) {
    expect(recommendations).toContain(ATTRIBUTE_VALUES[attributeIndex]);
  }
});

test("+ : getRecommendations : operations", () => {
  const query = "type";
  const recommendations = getQueryRecommendations(query);

  for (let catOperationIndex in CATEGORICAL_OPERATIONS) {
    expect(recommendations).toContain(
      CATEGORICAL_OPERATIONS[catOperationIndex]
    );
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
