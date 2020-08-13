import { Box, Checkbox, IconButton, SvgIconTypeMap } from "@material-ui/core";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import FullscreenExitIcon from "@material-ui/icons/FullscreenExit";
import InvertColorsOffIcon from "@material-ui/icons/InvertColorsOff";
import ZoomInIcon from "@material-ui/icons/ZoomIn";
import ZoomOutIcon from "@material-ui/icons/ZoomOut";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { changeStep } from "../../../../redux/actions";
import { getCurrentStep } from "../../../../redux/selectors";
import { fitfthColor, primaryColor } from "../../../../styles/theme";

interface ArtifactToolbarProps {
  sizeSelected: boolean;
  colorSelected: boolean;
  setSizeSelected: (checked: boolean) => void;
  setColorSelected: (checked: boolean) => void;
  handleZoomIn: () => void;
  handleZoomOut: () => void;
  title: string;
}

interface IconButton {
  iconElement: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
  checked: boolean;
  onChange: (event: any) => void;
}

export default function ArtifactToolbar(props: ArtifactToolbarProps) {
  const currentStep = useSelector(getCurrentStep);
  const dispatch = useDispatch();

  const clickHandler = () => {
    dispatch(changeStep(currentStep - 1));
  };

  const ICONS: IconButton[] = [
    {
      iconElement: ArrowBackIosIcon,
      checked: true,
      onChange: (event: any) => alert("Moving backward not implemented"),
    },
    {
      iconElement: ZoomInIcon,
      checked: true,
      onChange: props.handleZoomIn,
    },
    {
      iconElement: InvertColorsOffIcon,
      checked: props.colorSelected,
      onChange: (event: any) => props.setColorSelected(event.target.checked),
    },
    {
      iconElement: FullscreenExitIcon,
      checked: props.sizeSelected,
      onChange: (event: any) => props.setSizeSelected(event.target.checked),
    },
    {
      iconElement: ZoomOutIcon,
      checked: true,
      onChange: props.handleZoomOut,
    },
    {
      iconElement: ArrowForwardIosIcon,
      checked: true,
      onChange: (event: any) => alert("Moving Forward not implemented"),
    },
  ];

  return (
    <ContainerToolBar boxShadow={3}>
      <TitleContainer>
        <Title onClick={clickHandler}>{props.title}</Title>
      </TitleContainer>

      <CheckBoxContainer>
        {ICONS.map((iconButton: IconButton, index: number) => {
          const { checked, onChange } = iconButton;
          return (
            <Checkbox
              key={index}
              checked={checked}
              color="primary"
              checkedIcon={<iconButton.iconElement color="primary" />} //Compains if iconElement moved to deconstruction
              icon={<iconButton.iconElement color="action" />}
              onChange={onChange}
            />
          );
        })}
      </CheckBoxContainer>
    </ContainerToolBar>
  );
}

const ContainerToolBar = styled(Box)`
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  background-color: ${fitfthColor};
  height: 100%;
  width: 100%;
`;

const TitleContainer = styled.div`
  width: 100%;
  text-align: center;
  overflow-x: scroll;
`;

const Title = styled.h2`
  color: ${primaryColor};
`;

const CheckBoxContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  overflow-x: scroll;
  width: 100%;
`;
