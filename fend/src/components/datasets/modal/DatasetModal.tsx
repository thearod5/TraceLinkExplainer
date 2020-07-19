import Dialog from "@material-ui/core/Dialog";
import List from "@material-ui/core/List";
import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { changeStep } from "../../../redux/actions";
import { history } from "../../../redux/store";
import { FIRST_STEP_IN_WIZARD } from "../../../stepmanager/constants";
import { DATASET_ROUTE, SELECT_ARTIFACTS_ROUTE } from "../../nav/routes";
import ModalItem from "./ModalItem";

interface ModalItemContent {
  route: string | undefined;
  color: string;
}

const MODAL_ITEMS: Record<string, ModalItemContent> = {
  "Explore Artifacts": {
    route: SELECT_ARTIFACTS_ROUTE,
    color: "primary",
  },
  "View Dataset": {
    route: DATASET_ROUTE,
    color: "primary",
  },
  Back: {
    route: undefined,
    color: "secondary",
  },
};

interface DatasetModelProps {
  open: boolean;
  setClose: () => void;
}

export default function DatasetModal(props: DatasetModelProps) {
  const dispatch = useDispatch();

  const handleClose = () => {
    props.setClose();
  };

  const handleItemClick = (route: string) => {
    if (route === SELECT_ARTIFACTS_ROUTE) {
      dispatch(changeStep(FIRST_STEP_IN_WIZARD, undefined));
    }
    history.push(route);
  };

  return (
    <div>
      <Dialog
        onClose={handleClose}
        aria-labelledby="simple-dialog-title"
        open={props.open}
      >
        <ItemContainer>
          {Object.keys(MODAL_ITEMS).map((modalDescription) => {
            let itemContent: ModalItemContent = MODAL_ITEMS[modalDescription];
            return (
              <ModalItem
                optionDescription={modalDescription}
                color={itemContent.color}
                onClick={() =>
                  itemContent.route === undefined
                    ? props.setClose()
                    : handleItemClick(itemContent.route)
                }
              />
            );
          })}
        </ItemContainer>
      </Dialog>
    </div>
  );
}

const ItemContainer = styled(List)``;
