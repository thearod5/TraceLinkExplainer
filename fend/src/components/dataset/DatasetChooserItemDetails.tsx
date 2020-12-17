import AccordionDetails from '@material-ui/core/AccordionDetails'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import AccountTreeIcon from '@material-ui/icons/AccountTree'
import ViewModuleIcon from '@material-ui/icons/ViewModule'
import React, { JSXElementConstructor } from 'react'
import { VoidCallback } from '../../constants'
type ButtonClickCallback = (route: string) => void;

interface ModalItemContent {
  icon: JSXElementConstructor<{}>;
  disabled: boolean;
}

const MODAL_ITEMS: Record<string, ModalItemContent> = {
  'Link Explanation': {
    icon: AccountTreeIcon,
    disabled: false
  },
  'View Dataset': {
    icon: ViewModuleIcon,
    disabled: true
  }
}

interface ItemDetailsProps {
  onClick: () => void;
}

export default function DatasetChooserItemDetails (props: ItemDetailsProps) {
  return (
    <AccordionDetails className="centeredColumn">
      <ButtonGroup
        orientation="vertical"
        color="primary"
        aria-label="vertical contained primary button group"
        variant="contained"
      >
        {createButtons(props.onClick)}
      </ButtonGroup>
    </AccordionDetails>
  )
}

function createButtons (clickHandler: VoidCallback): JSX.Element[] {
  return Object.keys(MODAL_ITEMS).map((modalDescription) => {
    const itemContent: ModalItemContent = MODAL_ITEMS[modalDescription]
    return (
      <Button
        key={modalDescription}
        startIcon={<itemContent.icon />}
        onClick={() => clickHandler()}
        disabled={itemContent.disabled}
      >
        {modalDescription}
      </Button>
    )
  })
}
