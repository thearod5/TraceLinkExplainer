export const dummyDesign: Artifact = {
  id: "DD-16",
  body: "...place holder for design document...",
};

export const dummyDesignSearchItem: SearchItem = {
  artifact: dummyDesign,
  similarity: 0.4,
};

export const dummyDesignSearch: SearchResults = {
  items: [dummyDesignSearchItem],
  type: "Designs",
};

/*
 * Requirements
 */

export const dummyRequirement: Artifact = {
  id: "RE-8",
  body: "UAV State transitions when requested the...",
};

export const dummyRequirementSearchitem: SearchItem = {
  artifact: dummyRequirement,
  similarity: 0.5,
};

export const dummyRequirementSearch: SearchResults = {
  items: [dummyRequirementSearchitem],
  type: "Requirements",
};

export function dummyRecommendationFunction(
  query: string,
  relatedToArtifact?: Artifact
): [string] {
  return ["RE-8"];
}

export function dummySearchFunction(
  query: string,
  relatedToArtifact?: Artifact
): SearchResults[] {
  return [dummyRequirementSearch, dummyDesignSearch];
}
