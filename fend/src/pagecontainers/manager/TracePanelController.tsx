import { useSelector } from 'react-redux'
import { ElementSetter } from '../../constants'
import { Trace } from '../../operations/types/Trace'
import { getTrace } from '../../redux/selectors'
import useFindTraceController from './useFindTraceController'
import useMaintainFreshTraceData from './useMaintainFreshTraceData'

interface TraceManagerProps {
	setLeftPanel: ElementSetter;
	setRightPanel:ElementSetter;
}

/* Hook managing global state between finding source and target artifacts as well as fetching their trace information
 *
 */
export default function useTraceManager (props: TraceManagerProps) {
  const { setLeftPanel, setRightPanel } = props

  const trace: Trace = useSelector(getTrace)

  useFindTraceController({ setLeftPanel, setRightPanel })
  useMaintainFreshTraceData()
  const isExplanationGraphOpen = trace.selectedWord !== null

  return [isExplanationGraphOpen]
}
