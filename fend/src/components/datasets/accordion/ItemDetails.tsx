import AccordionDetails from "@material-ui/core/AccordionDetails";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import ViewModuleIcon from "@material-ui/icons/ViewModule";
import React, { JSXElementConstructor } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { changeStep } from "../../../redux/actions";
import { FIRST_STEP_IN_WIZARD } from "../../../redux/stepmanager/constants";
import { history } from "../../../redux/store";
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

interface ItemDetailsProps {}

export default function ItemDetails(props: ItemDetailsProps) {
  const dispatch = useDispatch();

  const handleItemClick: ButtonClickCallback = (route: string) => {
    if (route === SELECT_ARTIFACTS_ROUTE) {
      dispatch(changeStep(FIRST_STEP_IN_WIZARD, undefined));
    }

    history.push(route);
  };

  return (
    <ItemContainer>
      <ItemButtonGroup
        orientation="vertical"
        color="primary"
        aria-label="vertical contained primary button group"
        variant="contained"
      >
        {createButtons(handleItemClick)}
      </ItemButtonGroup>
    </ItemContainer>
  );
}

function createButtons(clickHandler: ButtonClickCallback): JSX.Element[] {
  return Object.keys(MODAL_ITEMS).map((modalDescription) => {
    let itemContent: ModalItemContent = MODAL_ITEMS[modalDescription];
    return (
      <Button
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

const ItemButtonGroup = styled(ButtonGroup)``;
