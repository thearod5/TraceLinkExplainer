import { SearchItem } from "../../../../../shared/Dataset";
import { TabKeys, Tabs } from "../tabbar/types";

export function getSelectedItems(
  searchResultList: SearchItem[],
  selectedIndex: number
) {
  const type_selected = Object.keys(Tabs)[selectedIndex];

  return searchResultList.filter(
    (searchResults) =>
      searchResults.artifact.type === type_selected ||
      type_selected === TabKeys[0] // All
  );
}
