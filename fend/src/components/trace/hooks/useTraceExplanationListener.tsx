import { useSelector } from 'react-redux'
import { Trace } from '../../../operations/types/Trace'
import { getTrace } from '../../../redux/selectors'

/* Hook managing global state between finding source and target artifacts as well as fetching their trace information
 *
 */
export default function useTraceExplanationListener () {
  const trace: Trace = useSelector(getTrace)
  const isExplanationGraphOpen = trace.selectedWord !== null
  return [isExplanationGraphOpen]
}
