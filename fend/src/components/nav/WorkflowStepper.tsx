import { Box } from "@material-ui/core";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Stepper from "@material-ui/core/Stepper";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { changeStep } from "../../redux/actions";
import { getCurrentStep } from "../../redux/selectors";
import store, { history } from "../../redux/store";
import {
  getStepChangeError,
  PAGE_STEP_MAPPING,
} from "../../shared/pagechanger/PageChanger";
import { primaryColor } from "../../styles/theme";

export default function WorkflowStepper() {
  const dispatch = useDispatch();
  const activeStep = useSelector(getCurrentStep) - 1; //recreated index at 0, but remove select dataset move
  const steps = getSteps();

  const moveToStep = (step: number) => {
    const error = getStepChangeError(store.getState(), step);
    if (error !== undefined) {
      alert(error);
    } else {
      const reIndexStep = step + 1;
      const nextPage = PAGE_STEP_MAPPING[reIndexStep]; //return to old index (with dataset as first step) for page mappings
      dispatch(changeStep(reIndexStep));
      history.push(nextPage);
    }
  };

  return (
    <StepperContainer boxShadow={3}>
      <WizardStepper activeStep={activeStep} alternativeLabel>
        {steps.map((label, stepIndex) => (
          <Step
            key={stepIndex}
            onClick={() => moveToStep(stepIndex)}
            color="primary"
          >
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </WizardStepper>
    </StepperContainer>
  );
}

function getSteps() {
  return ["Source Artifact", "Target Artifact", "View Trace"];
}

const StepperContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  overflow-y: hidden;
  height: 100%;
  width: 100%;
  background-color: ${primaryColor};
`;

const WizardStepper = styled(Stepper)``;
