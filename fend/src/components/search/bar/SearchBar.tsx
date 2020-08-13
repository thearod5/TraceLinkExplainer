import { Button, IconButton, Tooltip } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import CheckIcon from "@material-ui/icons/Check";
import KeyboardTabIcon from "@material-ui/icons/KeyboardTab";
import ReportProblemIcon from "@material-ui/icons/ReportProblem";
import Autocomplete from "@material-ui/lab/Autocomplete";
import React, { useEffect, useState } from "react";
import { getQueryRecommendations } from "../../../shared/query/QueryRecommender";
import { isValidQuery } from "../../../shared/query/QueryValidator";

const SEARCH_BAR_ID = "TARGET_ARTIFACT_SEARCH_BAR";
const ENTER_KEY_CODE = 13;
const PLACE_HOLDER_TEXT = "...search for a source artifact...";

type SubmitFuncType = (query: string) => void;
export interface SearchBarProps {
  onSearch: SubmitFuncType;
  onSubmit: () => void;
}

export default function SearchBar(props: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [validQuery, setValidQuery] = useState(true);
  const [queryError, setQueryError] = useState("");
  const [advancedSearch, setAdvancedSearch] = useState(true);

  useEffect(() => {
    const [isValid, error] = isValidQuery(query);
    setValidQuery(isValid);
    setQueryError(error);
  }, [query]);

  return (
    <div className="flexRowSpaceAround sizeFull">
      <div className="centeredColumn padLight">
        {validQuery ? (
          <CheckIcon color="secondary" className="heightFull" />
        ) : (
          <Tooltip title={queryError}>
            <ReportProblemIcon color="action" className="heightFull" />
          </Tooltip>
        )}
      </div>
      <div className="centeredColumn sizeFull roundBorder flexGrowTen">
        <Autocomplete
          id={SEARCH_BAR_ID}
          selectOnFocus
          clearOnBlur
          clearOnEscape
          handleHomeEndKeys
          freeSolo
          options={getQueryRecommendations(query)}
          value={query}
          onChange={(event: any, newValue: any) => {
            setQuery(newValue === null ? "" : [query, newValue, ""].join(" "));
          }}
          onInputChange={(event, newValue) => {
            setQuery(newValue);
          }}
          inputValue={query}
          renderInput={(params: object) =>
            SearchSuggestion(params, props.onSearch)
          }
          size="small"
          fullWidth={true}
        />
      </div>

      <div className="centeredColumn">
        <div className="flexRowCentered padSideLight" style={{ height: "70%" }}>
          <Button
            size="small"
            className="padLight"
            color="primary"
            variant="contained"
            onClick={(event: any) => props.onSearch(query)}
          >
            Search
          </Button>

          <Button
            size="small"
            className="padLight"
            color="secondary"
            onClick={() => setAdvancedSearch(!advancedSearch)}
          >
            {advancedSearch ? "Basic" : "Advanced"}
          </Button>

          <IconButton
            size="small"
            className="padLight"
            color="secondary"
            aria-label="find traces"
            onClick={() => props.onSubmit()}
          >
            <KeyboardTabIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
}

function SearchSuggestion(params: object, onSubmit: SubmitFuncType) {
  return (
    <TextField
      {...params}
      placeholder={PLACE_HOLDER_TEXT}
      variant="outlined"
      onKeyDown={(event) =>
        event.keyCode === ENTER_KEY_CODE
          ? onSubmit((event.target as HTMLInputElement).value)
          : undefined
      }
    />
  );
}
