import AccordionDetails from "@material-ui/core/AccordionDetails";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import ViewModuleIcon from "@material-ui/icons/ViewModule";
import React, { JSXElementConstructor } from "react";
import styled from "styled-components";
import { DATASET_ROUTE, SELECT_ARTIFACTS_ROUTE } from "../../nav/routes";
type ButtonClickCallback = (route: string) => void;

interface ModalItemContent {
  route: string;
  icon: JSXElementConstructor<{}>;
}

const MODAL_ITEMS: Record<string, ModalItemContent> = {
  "Link Explanation": {
    route: SELECT_ARTIFACTS_ROUTE,
    icon: AccountTreeIcon,
  },
  "View Dataset": {
    route: DATASET_ROUTE,
    icon: ViewModuleIcon,
  },
};

interface ItemDetailsProps {
  onClick: (route: string) => void;
}

export default function DatasetItemDetails(props: ItemDetailsProps) {
  return (
    <ItemContainer>
      <ButtonGroup
        orientation="vertical"
        color="primary"
        aria-label="vertical contained primary button group"
        variant="contained"
      >
        {createButtons(props.onClick)}
      </ButtonGroup>
    </ItemContainer>
  );
}

function createButtons(clickHandler: ButtonClickCallback): JSX.Element[] {
  return Object.keys(MODAL_ITEMS).map((modalDescription) => {
    let itemContent: ModalItemContent = MODAL_ITEMS[modalDescription];
    return (
      <Button
        key={itemContent.route}
        startIcon={<itemContent.icon />}
        onClick={() => clickHandler(itemContent.route)}
      >
        {modalDescription}
      </Button>
    );
  });
}

const ItemContainer = styled(AccordionDetails)`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
