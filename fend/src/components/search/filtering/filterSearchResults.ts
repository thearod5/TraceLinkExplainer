import { TabKeys, Tabs } from "../tabbar/types";
import { SearchResults } from "../types";

export function getSelectedItems(
  searchResultList: SearchResults[],
  selectedIndex: number
) {
  const type_selected = Object.keys(Tabs)[selectedIndex];

  return searchResultList
    .filter(
      (searchResults) =>
        searchResults.type === type_selected || type_selected === TabKeys[0] // All
    )
    .map((searchResult) => searchResult.items)
    .flat();
}
