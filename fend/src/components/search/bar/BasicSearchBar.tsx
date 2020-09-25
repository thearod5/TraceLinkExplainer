import { Button } from "@material-ui/core";
import React, { useState } from 'react';
import BasicSearchElement from "./BasicSearchElement";
import { SubmitFuncType } from './SearchBar';

const SEARCH_BAR_ID = "TARGET_ARTIFACT_SEARCH_BAR";

interface BasicSearchBarProps {
  query: string
  setQuery: SubmitFuncType
  validQuery: boolean
  queryError: string
  onSearch: () => void
  onChangeMode: () => void
}

export default function BasicSearchBar(props: BasicSearchBarProps) {
  const [idFilter, setIdFilter] = useState("id")
  const [idQuery, setIdQuery] = useState("")
  return (
    <div className="flexRowSpaceAround sizeFull">
      <BasicSearchElement
        label={"id"}
        options={["=", ">", "<"]}
        selectedOption={idFilter}
        selectOption={setIdFilter}
        value={idQuery}
        setValue={setIdQuery}
      />
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