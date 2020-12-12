import { getQueryRecommendations } from "../../operations/query/QueryRecommender";
import { ATTRIBUTE_VALUES, CATEGORICAL_OPERATIONS } from "../../operations/query/Types";

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
