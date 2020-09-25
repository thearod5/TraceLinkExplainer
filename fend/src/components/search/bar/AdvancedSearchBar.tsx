import { Button, Tooltip } from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import ReportProblemIcon from "@material-ui/icons/ReportProblem";
import Autocomplete from "@material-ui/lab/Autocomplete";
import React from 'react';
import { getQueryRecommendations } from "../../../shared/query/QueryRecommender";
import { SearchSuggestion, SubmitFuncType } from './SearchBar';

const SEARCH_BAR_ID = "TARGET_ARTIFACT_SEARCH_BAR";

interface AdvancedSearchBarProps {
  query: string
  setQuery: SubmitFuncType
  validQuery: boolean
  queryError: string
  onSearch: () => void
  onChangeMode: () => void
}

export default function AdvancedSearchBar(props: AdvancedSearchBarProps) {
  return (<div className="flexRowSpaceAround sizeFull">
    <div className="centeredColumn padLight">
      {props.validQuery ? (
        <CheckIcon color="secondary" className="heightFull" />
      ) : (
          <Tooltip title={props.queryError}>
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
        options={getQueryRecommendations(props.query)}
        value={props.query}
        onChange={(event: any, newValue: any) => {
          props.setQuery(newValue === null ? "" : [props.query, newValue, ""].join(" "));
        }}
        onInputChange={(event, newValue) => {
          props.setQuery(newValue);
        }}
        inputValue={props.query}
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
          onClick={(event: any) => props.onSearch()}
        >
          Search
          </Button>

        <Button
          size="small"
          className="padLight"
          color="secondary"
          onClick={() => props.onChangeMode()}
        >
          {"Advanced"}
        </Button>
      </div>
    </div>
  </div>)
}