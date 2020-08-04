import { Checkbox } from "@material-ui/core";
import FullscreenIcon from "@material-ui/icons/Fullscreen";
import FullscreenExitIcon from "@material-ui/icons/FullscreenExit";
import InvertColorsIcon from "@material-ui/icons/InvertColors";
import InvertColorsOffIcon from "@material-ui/icons/InvertColorsOff";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { changeStep } from "../../redux/actions";
import { getCurrentStep } from "../../redux/selectors";
import { fitfthColor, primaryColor } from "../../styles/theme";

interface ArtifactToolbarProps {
  sizeSelected: boolean;
  colorSelected: boolean;
  setSizeSelected: (checked: boolean) => void;
  setColorSelected: (checked: boolean) => void;
  title: string;
}

export default function ArtifactToolbar(props: ArtifactToolbarProps) {
  const currentStep = useSelector(getCurrentStep);
  const dispatch = useDispatch();

  const clickHandler = () => {
    dispatch(changeStep(currentStep - 1, undefined));
  };

  return (
    <ContainerToolBar onClick={clickHandler}>
      <h2 style={{ color: primaryColor }}>{props.title}</h2>
      <CheckBoxContainer>
        <Checkbox
          checked={props.colorSelected}
          value="Color"
          color="primary"
          checkedIcon={<InvertColorsOffIcon color="primary" />}
          icon={<InvertColorsIcon color="action" />}
          onChange={(event: any) =>
            props.setColorSelected(event.target.checked)
          }
        />

        <Checkbox
          checked={props.sizeSelected}
          value="Size"
          color="primary"
          checkedIcon={<FullscreenExitIcon color="primary" />}
          icon={<FullscreenIcon color="action" />}
          onChange={(event: any) => props.setSizeSelected(event.target.checked)}
        />
      </CheckBoxContainer>
    </ContainerToolBar>
  );
}

const ContainerToolBar = styled.div`
  display: flex;
  align-content: center;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px;
  background-color: ${fitfthColor};
  width: 100%;
`;

const CheckBoxContainer = styled.div`
  display: flex;
  flex-direction: row;
`;
