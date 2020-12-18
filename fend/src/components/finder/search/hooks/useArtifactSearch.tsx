import { useCallback, useContext, useEffect, useState } from 'react'
import { AppContext } from '../../../../App'
import { SEARCH_LIMIT, StringCallback, SuggestionFunctionType } from '../../../../types/constants'
import { Artifact } from '../../../../types/Project'

export default function useArtifactSearch (searchFunction: SuggestionFunctionType): [Artifact[], boolean, StringCallback] {
  const [queriedArtifacts, setQueriedArtifacts] = useState<Artifact[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const { setError } = useContext(AppContext)

  const onSearch = useCallback((query:string) => {
    setIsLoading(true)
    searchFunction(query, SEARCH_LIMIT).then((artifacts: Artifact[]) => {
      setQueriedArtifacts(artifacts)
      setIsLoading(false)
    })
      .catch((e) => {
        setError(e)
        setIsLoading(false)
      })
  }, [setError, searchFunction])

  useEffect(() => onSearch(''), [onSearch])
  return [queriedArtifacts, isLoading, onSearch]
}
