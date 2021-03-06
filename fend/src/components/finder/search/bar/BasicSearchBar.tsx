import React, { useEffect, useState } from 'react'
import { AttributeTypeMap } from '../query/Types'
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
  const [nameFilter, setIdFilter] = useState('=')
  const [nameQuery, setIdQuery] = useState(EMPTY_QUERY)
  const [bodyFilter, setBodyFilter] = useState('~')
  const [bodyQuery, setBodyQuery] = useState(EMPTY_QUERY)
  const [typeFilter, setTypeFilter] = useState('=')
  const [typeQuery, setTypeQuery] = useState(EMPTY_QUERY)

  const { setQuery, onSearch } = props

  const createQuery = (): string => {
    const queries = [['name', nameFilter, nameQuery], ['body', bodyFilter, bodyQuery], ['type', typeFilter, typeQuery]]
    return queries
      .filter(parts => parts[2] !== EMPTY_QUERY)
      .map(parts => `${parts[0]} ${parts[1]} ${parts[2]}`)
      .join(' ^^ ')
  }

  useEffect(() => {
    setQuery(createQuery())
    // eslint-disable-next-line
  }, [nameFilter, nameQuery, bodyFilter, bodyQuery, typeFilter, typeQuery])

  const createQuerySetter = (setter: REACT_STRING_SETTER) => {
    return (query: string) => {
      setter(query)
    }
  }

  return (
    <div className="flexRowSpaceAround padSmall">

      <QueryFilterElement
        label={'name'}
        filterOperations={AttributeTypeMap.name}
        selectedFilter={nameFilter}
        setFilter={setIdFilter}
        query={nameQuery}
        setQuery={createQuerySetter(setIdQuery)}
        onSearch={onSearch}
      />
      <QueryFilterElement
        label={'type'}
        filterOperations={AttributeTypeMap.type}
        selectedFilter={typeFilter}
        setFilter={setTypeFilter}
        query={typeQuery}
        setQuery={createQuerySetter(setTypeQuery)}
        onSearch={onSearch}
        options={['requirements', 'designs', 'code']}
      />
      <QueryFilterElement
        label={'body'}
        filterOperations={AttributeTypeMap.body}
        selectedFilter={bodyFilter}
        setFilter={setBodyFilter}
        query={bodyQuery}
        setQuery={createQuerySetter(setBodyQuery)}
        onSearch={onSearch}
      />
    </div>)
}
