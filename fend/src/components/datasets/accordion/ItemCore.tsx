import { Button } from "@material-ui/core";
import React from "react";

interface ModalItemProps {
  optionDescription: string;
  onClick: () => void;
}

export default function ItemCore(props: ModalItemProps) {
  return <Button onClick={props.onClick}>{props.optionDescription}</Button>;
}
