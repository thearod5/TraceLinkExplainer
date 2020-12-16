import { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { SEARCH_LIMIT, StringCallback } from '../../../../constants'
import { Artifact } from '../../../../operations/types/Dataset'
import { setError } from '../../../../redux/actions'
import { SuggestionFunctionType } from '../types'

export default function useArtifactSearch (searchFunction: SuggestionFunctionType): [Artifact[], boolean, StringCallback] {
  const [queriedArtifacts, setQueriedArtifacts] = useState<Artifact[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()
  const onSearch = useCallback((query:string) => {
    setIsLoading(true)
    searchFunction(query, SEARCH_LIMIT).then((artifacts: Artifact[]) => {
      setQueriedArtifacts(artifacts)
      setIsLoading(false)
    })
      .catch((e) => {
        dispatch(setError(e))
        setIsLoading(false)
      })
  }, [dispatch, searchFunction])

  useEffect(() => onSearch(''), [onSearch])
  return [queriedArtifacts, isLoading, onSearch]
}
