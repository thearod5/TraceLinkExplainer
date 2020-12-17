import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { VoidCallback } from '../../../../constants'
import { setTrace } from '../../../../redux/actions'
import { getTrace } from '../../../../redux/selectors'
import { Explanation } from '../Explanation'

export function useTraceExplanationCreator (): [VoidCallback, string | null, JSX.Element | null] {
  const trace = useSelector(getTrace)
  const { selectedWord, relationships } = trace
  const dispatch = useDispatch()

  const handleClose = () => {
    dispatch(setTrace({ ...trace, selectedWord: null }))
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
