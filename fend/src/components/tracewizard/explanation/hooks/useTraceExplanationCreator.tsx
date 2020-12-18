import React, { useContext } from 'react'
import { VoidCallback } from '../../../../constants'
import { TraceContext } from '../../types'
import { Explanation } from '../Explanation'

export function useTraceExplanationCreator (): [VoidCallback, string | null, JSX.Element | null] {
  const { trace, setTrace } = useContext(TraceContext)
  const { selectedWord, relationships } = trace

  const handleClose = () => {
    setTrace({ ...trace, selectedWord: null })
  }

  if (selectedWord === null || relationships === null) {
    return [handleClose, null, null]
  }
  const body = (
    <div className="padSmall">
      <Explanation families={relationships.filter(relationship => selectedWord.relationshipIds.includes(relationship.title))} />
    </div>)

  return [handleClose, selectedWord.word, body]
}
