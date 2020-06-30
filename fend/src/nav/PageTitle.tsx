import React, { useState } from 'react'
import styled from 'styled-components'
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import { useHistory } from "react-router-dom";

const HEIGHT_FROM_TOP = "25px"
const BORDER_LINE = "2px solid black"
const ICON_FONT_SIZE = "48px" //TODO: why does this define the height of the bar
const TEXT_SIDE_PADDING = "15px";

//TODO: Replace hardcoded text with store
function PageTitle() {
  const [isHovering, setIsHovering] = useState(false);
  let history = useHistory();

  return (
    <TitleContainer>
      <ArrowLeftIcon
        style={TitleIconStyle}
        onClick={() => history.goBack()}
        color={isHovering ? "primary" : undefined}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      />
      <TitleText>{"DRONE"}</TitleText>
    </TitleContainer >)
}

const TitleContainer = styled.div`
  display: flex;
  flex-direct: row;
  align-items: stretch;
  margin-top: ${HEIGHT_FROM_TOP}

`

const TitleIconStyle = {
  height: "100%",
  fontSize: ICON_FONT_SIZE,
  borderTop: BORDER_LINE,
  borderRight: BORDER_LINE,
  borderBottom: BORDER_LINE,
}

const TitleText = styled.h1`
 margin: 0px;
 padding-left: ${TEXT_SIDE_PADDING};
 padding-right: ${TEXT_SIDE_PADDING};
 display: inline-block;
 border-top: ${BORDER_LINE};
 border-bottom: ${BORDER_LINE};
 border-right: ${BORDER_LINE};
`

export default PageTitle