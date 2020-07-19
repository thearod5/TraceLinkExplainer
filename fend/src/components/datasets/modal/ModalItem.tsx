import { ListItem, ListItemText } from "@material-ui/core";
import React from "react";
import styled from "styled-components";

interface ModalItemProps {
  optionDescription: string;
  color: string;
  onClick: () => void;
}

export default function ModalItem(props: ModalItemProps) {
  return (
    <ModalItemContainer button onClick={props.onClick}>
      <ListItemText>{props.optionDescription}</ListItemText>
    </ModalItemContainer>
  );
}

const ModalItemContainer = styled(ListItem)``;
