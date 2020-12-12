import React, { useEffect, useState } from 'react'
import { CATEGORICAL_OPERATIONS } from '../../../operations/query/Types'
import QueryFilterElement from './QueryFilterElement'
import { SubmitFuncType } from './SearchBar'

export type REACT_STRING_SETTER = React.Dispatch<React.SetStateAction<string>>
const EMPTY_QUERY = ''

interface BasicSearchBarProps {
  query: string
  setQuery: SubmitFuncType
  validQuery: boolean
  queryError: string
  onSearch: () => void
  onChangeMode: () => void
}

export default function BasicSearchBar (props: BasicSearchBarProps) {
  const [idFilter, setIdFilter] = useState('=')
  const [idQuery, setIdQuery] = useState(EMPTY_QUERY)
  const [bodyFilter, setBodyFilter] = useState('~')
  const [bodyQuery, setBodyQuery] = useState(EMPTY_QUERY)
  const [typeFilter, setTypeFilter] = useState('=')
  const [typeQuery, setTypeQuery] = useState(EMPTY_QUERY)

  const { setQuery, onSearch } = props

  const createQuery = (): string => {
    const queries = [['id', idFilter, idQuery], ['body', bodyFilter, bodyQuery], ['type', typeFilter, typeQuery]]
    return queries
      .filter(parts => parts[2] !== EMPTY_QUERY)
      .map(parts => `${parts[0]} ${parts[1]} ${parts[2]}`)
      .join(' && ')
  }

  useEffect(() => {
    setQuery(createQuery())
    // eslint-disable-next-line
  }, [idFilter, idQuery, bodyFilter, bodyQuery, typeFilter, typeQuery])

  const createQuerySetter = (setter: REACT_STRING_SETTER) => {
    return (query: string) => {
      setter(query)
    }
  }

  return (
    <div className="flexRowSpaceAround sizeFull">
      <QueryFilterElement
        label={'type'}
        filterOperations={CATEGORICAL_OPERATIONS}
        selectedFilter={typeFilter}
        setFilter={setTypeFilter}
        query={typeQuery}
        setQuery={createQuerySetter(setTypeQuery)}
        onSearch={onSearch}
      />
      <QueryFilterElement
        label={'body'}
        filterOperations={CATEGORICAL_OPERATIONS}
        selectedFilter={bodyFilter}
        setFilter={setBodyFilter}
        query={bodyQuery}
        setQuery={createQuerySetter(setBodyQuery)}
        onSearch={onSearch}
      />
      <QueryFilterElement
        label={'id'}
        filterOperations={CATEGORICAL_OPERATIONS}
        selectedFilter={idFilter}
        setFilter={setIdFilter}
        query={idQuery}
        setQuery={createQuerySetter(setIdQuery)}
        onSearch={onSearch}
      />
    </div>)
}
