import React, { useState } from 'react'
import ExplanationPanel from '../../../components/explanation/ExplanationPanel'
import { BiPanelView } from '../BiPanelView'
import useTracePanelController from '../TracePanelController'

/* Contains the view and state controller for finding and viewing a trace
 *
 */
export default function TracePanel () {
  const [leftPanel, setLeftPanel] = useState<JSX.Element | null>(null)
  const [rightPanel, setRightPanel] = useState<JSX.Element | null>(null)

  const [modalOpen] = useTracePanelController({ setLeftPanel, setRightPanel })
  return (
    <div>
      <BiPanelView
        leftPanel={leftPanel}
        rightPanel={rightPanel}
      />
      <ExplanationPanel open={modalOpen} />
    </div>
  )
}
