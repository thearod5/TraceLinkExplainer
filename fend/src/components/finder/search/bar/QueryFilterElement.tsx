import { FormControl, InputLabel, MenuItem, Select, TextField, Tooltip } from '@material-ui/core'
import React from 'react'
import { OPERATION_NAMES } from '../query/Types'
import { ENTER_KEY_CODE } from './SearchBar'

interface BasicSearchElementProps {
  label: string
  filterOperations: string[]
  selectedFilter: string
  setFilter: (value: string) => void
  query: string
  setQuery: (value: string) => void
  onSearch: () => void
  options? : string[]
}

export default function QueryFilterElement (props: BasicSearchElementProps) {
  const createOnChangeHandler = (propHandler: (v: string) => void) => {
    return (event: React.ChangeEvent<{ value: unknown }>) => {
      propHandler(event.target.value as string)
    }
  }

  const searchIfEnter = (event: any) => {
    if (event.keyCode === ENTER_KEY_CODE) { props.onSearch() }
  }

  return (
    <div className="centeredColumn">
      <div className="flexRow borderRound">
        <FormControl className="flexRow">
          <InputLabel color="primary">{props.label}</InputLabel>
          <Select
            value={props.selectedFilter}
            onChange={createOnChangeHandler(props.setFilter)}
            color="primary"
          >
            {props.filterOperations.map(option => filterMenuItem(option))}
          </Select>
        </FormControl>

        <div className="flexColumn justifyContentFlexEnd">
          <FormControl className="flexRow">
            {props.options === undefined
              ? <TextField
                value={props.query}
                onChange={createOnChangeHandler(props.setQuery)}
                onKeyDown={searchIfEnter}
                color="primary"
              />
              : <Select
                value={props.query}
                style={{ minWidth: '100px' }}
                onChange={createOnChangeHandler(props.setQuery)}
                color="primary"
              >
                {props.options.map(o => <MenuItem key={o} value={o}>{o}</MenuItem>)}
              </Select>}
          </FormControl>
        </div>
      </div>
    </div>)
}

function filterMenuItem (option: string) {
  return (
    <MenuItem key={option} value={option}>
      <Tooltip title={OPERATION_NAMES[option]} placement="right">
        <label>{option}</label>
      </Tooltip>
    </MenuItem>)
}
