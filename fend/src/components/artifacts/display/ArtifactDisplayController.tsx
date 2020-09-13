import { Accordion, AccordionDetails, AccordionSummary, Checkbox, IconButton, SvgIconTypeMap } from "@material-ui/core";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React, { useState } from "react";
import { createWords } from "../../../shared/artifacts/WordCreator";
import { FamilyColors, WordDescriptors } from "../../../shared/types/Trace";
import { primaryColor, secondaryColor } from "../../../styles/theme";
import ArtifactTitle from "./ArtifactToolbar";
import ArtifactWords from "./ArtifactWords";
import { generateIcons } from "./ToolbarIcons";

interface IconButton {
  iconElement: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
  checked: boolean;
  onChange: (event: any) => void;
}

export const defaultColor = "black";
const fontSizeDelta = 0.2;
const ToolbarHeightPercentage = 15;

interface ArtifactDisplayProps {
  words: WordDescriptors;
  artifactType: string;
  artifactId: string;
  familyColors: FamilyColors;
  expanded: boolean;
  onExpand: () => void;
  onShrink: () => void;
}

export default function ArtifactDisplayController(props: ArtifactDisplayProps) {
  const [sizeSelected, setSizeSelected] = useState(true);
  const [colorSelected, setColorSelected] = useState(true);
  const [defaultSize, setDefaultSize] = useState(1);

  const words = createWords(
    props.words,
    sizeSelected,
    colorSelected,
    defaultSize,
    props.familyColors,
    defaultColor
  );

  const handleZoomIn = () => setDefaultSize(defaultSize + fontSizeDelta);
  const handleZoomOut = () => setDefaultSize(defaultSize - fontSizeDelta)

  const icons = generateIcons(handleZoomIn,
    handleZoomOut,
    colorSelected, setColorSelected,
    sizeSelected, setSizeSelected)

  const iconCheckboxes = icons.map((iconButton: IconButton, index: number) => {
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
  })

  const handleChange = (event: React.ChangeEvent<{}>, newExpanded: boolean) => {
    const callBack = newExpanded ? props.onExpand : props.onShrink
    callBack()
  };

  return (
    <Accordion
      className="flexColumn"
      TransitionProps={{ unmountOnExit: true }}
      expanded={props.expanded}
      onChange={handleChange}
    >
      <AccordionSummary
        style={{
          height: `${ToolbarHeightPercentage}%`,
          backgroundColor: primaryColor
        }}
        expandIcon={<ExpandMoreIcon />}
      >
        <ArtifactTitle
          title={props.artifactId}
        />
      </AccordionSummary>
      <AccordionDetails className="flexColumn">
        <div
          className="flexRow justifyContentCenter roundBorder"
          style={{ backgroundColor: secondaryColor }}>
          {iconCheckboxes}
        </div>
        <ArtifactWords words={words} />
      </AccordionDetails>
    </Accordion>
  );
}
