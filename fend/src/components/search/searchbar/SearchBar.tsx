import TextField from "@material-ui/core/TextField";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Autocomplete from "@material-ui/lab/Autocomplete";
import React from "react";
import styled from "styled-components";

const SEARCH_BAR_ID = "TARGET_ARTIFACT_SEARCH_BAR";
const ENTER_KEY_CODE = 13;
const PLACE_HOLDER_TEXT = "...artifact text...";
const UNIMPLEMTED_ADVANCED_SEARCH_MESSAGE =
  "Advanced search is not yet implemented.";

interface SearchBarProps {
  onSubmit: (query: string) => void;
  searchOptions: string[];
}

// TODO: Vertically stack text and icons to make more room
// TODO: Fix overflow of search bar tabs. Add button to see more tabs.

export default function SearchBar(props: SearchBarProps) {
  return (
    <SearchBarContainer>
      <StyledSearchBar
        id={SEARCH_BAR_ID}
        freeSolo
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        options={props.searchOptions}
        style={SearchBarStyle}
        renderInput={(params: object) => (
          <TextField
            {...params}
            placeholder={PLACE_HOLDER_TEXT}
            variant="outlined"
            onKeyDown={(event) =>
              event.keyCode === ENTER_KEY_CODE
                ? props.onSubmit((event.target as HTMLInputElement).value)
                : undefined
            }
          />
        )}
      />
      <MoreVertIcon
        style={MoreIconStyle}
        onClick={() => alert(UNIMPLEMTED_ADVANCED_SEARCH_MESSAGE)}
      />
    </SearchBarContainer>
  );
}

const SEARCH_BAR_WIDTH = 500;
const SEARCH_BAR_MIN_WIDTH = 100;
const SEARCH_BAR_MAX_WIDTH = 1000;
const SEARCH_BAR_HEIGHT = 55;
const SEARCH_BAR_SIDE_PADDING = 10;

const MORE_ICON_SIDE_MARGIN = 10;

const SearchBarContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: ${SEARCH_BAR_HEIGHT}px;
  width: 100%;
`;

const StyledSearchBar = styled(Autocomplete)`
  border-radius: 5px;
`;

const SearchBarStyle = {
  maxWidth: `${SEARCH_BAR_MAX_WIDTH}px`,
  minWidth: `${SEARCH_BAR_MIN_WIDTH}px`,
  width: `${SEARCH_BAR_WIDTH}px`,
  height: `${SEARCH_BAR_HEIGHT}px;`,
  paddingLeft: `${SEARCH_BAR_SIDE_PADDING}px`,
};

const MoreIconStyle = {
  height: `100%`,
  marginLeft: `${MORE_ICON_SIDE_MARGIN}px`,
};
