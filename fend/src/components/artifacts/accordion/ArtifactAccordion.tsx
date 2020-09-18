import { Accordion, AccordionDetails, AccordionSummary, Checkbox, IconButton, SvgIconTypeMap } from "@material-ui/core";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React, { useState } from "react";
import { createWords } from "../../../shared/artifacts/WordCreator";
import { Families, FamilyColors, Word, WordDescriptors } from "../../../shared/types/Trace";
import { primaryColor, secondaryColor } from "../../../styles/theme";
import ArtifactTitle from "./ArtifactTitle";
import ArtifactWords from "./ArtifactWords";
import { generateIcons } from "./ToolbarIcons";

interface IconButton {
  iconElement: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
  checked: boolean;
  onChange: (event: any) => void;
}

export const DEFAULT_FONT_COLOR = "black";
const fontSizeDelta = 0.2;
const ToolbarHeightPercentage = 15;

interface ArtifactDisplayProps {
  artifactType: string;
  artifactId: string;
  words: WordDescriptors;
  families: Families;
  familyColors: FamilyColors;
  expanded: boolean;
  onExpand: () => void;
  onShrink: () => void;
}

export default function ArtifactAccordion(props: ArtifactDisplayProps) {
  const [sizeSelected, setSizeSelected] = useState(true);
  const [colorSelected, setColorSelected] = useState(true);
  const [fontSize, setFontSize] = useState(1);
  const [selectedWord, setSelectedWord] = useState<Word | null>(null)

  const words = createWords(
    props.words,
    props.families,
    fontSize,
    props.familyColors,
    DEFAULT_FONT_COLOR
  );

  const handleZoomIn = () => setFontSize(fontSize + fontSizeDelta);
  const handleZoomOut = () => setFontSize(fontSize - fontSizeDelta)

  const icons = generateIcons(
    handleZoomIn,
    handleZoomOut,
    colorSelected,
    setColorSelected,
    sizeSelected,
    setSizeSelected)

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
  const ACCORDION_MAX_HEIGHT = 500 //px

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
      <AccordionDetails
        className="flexRow"
        style={{ maxHeight: `${ACCORDION_MAX_HEIGHT}px` }}
      >
        <div className="centeredColumn padLight" style={{ width: "40px" }}>
          <div
            className="flexColumn justifyContentCenter roundBorder"
            style={{ backgroundColor: secondaryColor }}>
            {iconCheckboxes}
          </div>
        </div>
        <div className="overflowScroll" style={{}}>
          <ArtifactWords
            words={words}
            families={props.families}
            colorSelected={colorSelected}
            sizeSelected={sizeSelected}
            defaultSize={fontSize}
            selectedWord={selectedWord}
            setSelectedWord={setSelectedWord}
          />
        </div>
      </AccordionDetails>
    </Accordion>
  );
}
