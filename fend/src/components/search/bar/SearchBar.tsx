import { Button } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import React, { useEffect, useState } from 'react'
import { isValidQuery } from '../../../operations/query/QueryValidator'
import AdvancedSearchBar from './AdvancedSearchBar'
import BasicSearchBar from './BasicSearchBar'

export const ENTER_KEY_CODE = 13
const PLACE_HOLDER_TEXT = '...search for a source artifact...'

export type SubmitFuncType = (query: string) => void;
export interface SearchBarProps {
  onSearch: SubmitFuncType;
}

export default function SearchBar (props: SearchBarProps) {
  const [query, setQuery] = useState('')
  const [validQuery, setValidQuery] = useState(true)
  const [queryError, setQueryError] = useState('')
  const [advancedSearch, setAdvancedSearch] = useState(false)

  useEffect(() => {
    const [isValid, error] = isValidQuery(query)
    setValidQuery(isValid)
    setQueryError(error)
  }, [query])

  const advancedSearchBar = <AdvancedSearchBar
    query={query}
    setQuery={setQuery}
    validQuery={validQuery}
    queryError={queryError}
    onSearch={() => props.onSearch(query)}
    onChangeMode={() => setAdvancedSearch(!advancedSearch)}
  />

  const basicSearchBar = <BasicSearchBar
    query={query}
    setQuery={setQuery}
    validQuery={validQuery}
    queryError={queryError}
    onSearch={() => props.onSearch(query)}
    onChangeMode={() => setAdvancedSearch(!advancedSearch)} />

  const searchBar = advancedSearch ? advancedSearchBar : basicSearchBar

  return (
    <div className="flexRow widthFull justifyContentSpaceBetween">
      {searchBar}
      <div className="centeredColumn">
        <div className="flexRowCentered padSideLight" style={{ height: '70%' }}>
          <Button
            size="medium"
            className="padSmall"
            color="primary"
            variant="contained"
            onClick={(event: any) => props.onSearch(query)}
          >
            Search
          </Button>

          <Button
            size="small"
            className="padSmall"
            color="primary"
            onClick={() => setAdvancedSearch(!advancedSearch)}
          >
            {advancedSearch ? 'Basic' : 'Advanced'}
          </Button>
        </div>
      </div></div>)
}

export function SearchSuggestion (params: object, onSubmit: SubmitFuncType) {
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
  )
}
