import { useContext } from 'react'
import { TraceContext } from '../../types'

/* Hook managing global state between finding source and target artifacts as well as fetching their trace information
 *
 */
export default function useTraceExplanationListener () {
  const { trace } = useContext(TraceContext)
  const isExplanationGraphOpen = trace.selectedWord !== null
  return [isExplanationGraphOpen]
}
