import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Stepper from "@material-ui/core/Stepper";
import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { getCurrentStep } from "../../redux/selectors";
import { BORDER_LINE_EMPHASIS } from "../../styles/constants";
interface StepperProps {}

export default function WorkflowStepper(props: StepperProps) {
  const activeStep = useSelector(getCurrentStep);
  const steps = getSteps();

  return (
    <StepperContainer>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label, stepIndex) => (
          <Step key={stepIndex}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </StepperContainer>
  );
}

function getSteps() {
  return ["Select Dataset", "Source Artifact", "Target Artifact", "View Trace"];
}

const StepperContainer = styled.div`
  border-bottom: ${BORDER_LINE_EMPHASIS};
  width: 100%;
`;
