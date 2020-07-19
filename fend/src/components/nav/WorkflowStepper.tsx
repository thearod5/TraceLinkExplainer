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
} from "../../stepmanager/PageChanger";
import { BORDER_LINE_EMPHASIS } from "../../styles/constants";

interface StepperProps {}

export default function WorkflowStepper(props: StepperProps) {
  const dispatch = useDispatch();
  const activeStep = useSelector(getCurrentStep);
  const steps = getSteps();

  const moveToStep = (step: number) => {
    const error = getStepChangeError(store.getState(), step, undefined);
    if (error !== undefined) {
      alert(error);
    } else {
      const nextPage = PAGE_STEP_MAPPING[step];
      dispatch(changeStep(step, undefined));
      history.push(nextPage);
    }
  };

  console.log(activeStep);

  return activeStep != 0 ? (
    <StepperContainer>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label, stepIndex) => (
          <Step key={stepIndex} onClick={() => moveToStep(stepIndex)}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </StepperContainer>
  ) : null;
}

function getSteps() {
  return ["Select Dataset", "Source Artifact", "Target Artifact", "View Trace"];
}

const StepperContainer = styled.div`
  border-bottom: ${BORDER_LINE_EMPHASIS};
  width: 100%;
`;
