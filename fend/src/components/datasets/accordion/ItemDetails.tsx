import AccordionDetails from "@material-ui/core/AccordionDetails";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { changeStep } from "../../../redux/actions";
import { getCurrentStep } from "../../../redux/selectors";
import { history } from "../../../redux/store";
import { FIRST_STEP_IN_WIZARD } from "../../../stepmanager/constants";
import { DATASET_ROUTE, SELECT_ARTIFACTS_ROUTE } from "../../nav/routes";

type ButtonClickCallback = (route: string) => void;

interface ModalItemContent {
  route: string;
}

const MODAL_ITEMS: Record<string, ModalItemContent> = {
  "Explore Artifacts": {
    route: SELECT_ARTIFACTS_ROUTE,
  },
  "View Dataset": {
    route: DATASET_ROUTE,
  },
};

interface ItemDetailsProps {}

export default function ItemDetails(props: ItemDetailsProps) {
  const dispatch = useDispatch();
  const activeStep = useSelector(getCurrentStep);

  const handleItemClick: ButtonClickCallback = (route: string) => {
    if (route === SELECT_ARTIFACTS_ROUTE) {
      dispatch(changeStep(FIRST_STEP_IN_WIZARD, undefined));
      console.log("changing steps...", activeStep);
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
      <Button onClick={() => clickHandler(itemContent.route)}>
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
