import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeStep } from "../../../redux/actions";
import { getCurrentStep } from "../../../redux/selectors";
import { secondaryColor } from "../../../styles/theme";

interface ArtifactToolbarProps {
  title: string;
}

export default function ArtifactTitle(props: ArtifactToolbarProps) {
  const currentStep = useSelector(getCurrentStep);
  const dispatch = useDispatch();

  const clickHandler = () => {
    dispatch(changeStep(currentStep - 1));
  };

  return (
    <div
      className="centeredColumn"
    >
      <div className="textAlignCenter overflowXScroll">
        <h3 onClick={clickHandler} style={{ color: secondaryColor }}>
          {props.title}
        </h3>
      </div>
    </div>
  );
}
