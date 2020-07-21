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

interface StepperProps {}

export default function WorkflowStepper(props: StepperProps) {
  const dispatch = useDispatch();
  const activeStep = useSelector(getCurrentStep) - 1; //recreated index at 0, but remove select dataset move
  const steps = getSteps();

  const moveToStep = (step: number) => {
    const error = getStepChangeError(store.getState(), step, undefined);
    if (error !== undefined) {
      alert(error);
    } else {
      const reIndexStep = step + 1;
      const nextPage = PAGE_STEP_MAPPING[reIndexStep]; //return to old index (with dataset as first step) for page mappings
      dispatch(changeStep(reIndexStep, undefined));
      history.push(nextPage);
    }
  };

  return (
    <StepperContainer>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label, stepIndex) => (
          <Step key={stepIndex} onClick={() => moveToStep(stepIndex)}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </StepperContainer>
  );
}

function getSteps() {
  return ["Source Artifact", "Target Artifact", "View Trace"];
}

const StepperContainer = styled.div`
  width: 100%;
`;
