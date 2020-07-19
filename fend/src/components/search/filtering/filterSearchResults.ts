import { SearchItem } from "../../../../../shared/Dataset";
import { TabKeys, Tabs } from "../tabbar/types";

export function getSelectedItems(
  searchResultList: SearchItem[],
  selectedIndex: number
): SearchItem[] {
  if (searchResultList === undefined) return []; //TODO: Find why bend returning undefined
  const typeSelected = Object.keys(Tabs)[selectedIndex];

  return searchResultList.filter(
    (searchResults) =>
      searchResults.artifact.type === typeSelected ||
      typeSelected === TabKeys[0] // All
  );
}
