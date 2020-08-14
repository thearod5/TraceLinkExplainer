import { Box, Checkbox } from "@material-ui/core";
import KeyboardTabIcon from "@material-ui/icons/KeyboardTab";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeStep, setError } from "../../redux/actions";
import { getCurrentStep } from "../../redux/selectors";
import { appHistory } from "../../redux/store";
import { ArtifactMutatorActionType } from "../../redux/types";
import {
  SELECT_SOURCE_STEP,
  VIEW_TRACE_STEP,
} from "../../shared/pagechanger/constants";
import { getStepChangeError } from "../../shared/pagechanger/PageChanger";
import { Artifact, artifactsAreEqual } from "../../shared/types/Dataset";
import { SearchItem } from "../../shared/types/Search";
import { primaryColor, secondaryColor } from "../../styles/theme";
import { TRACE_VIEW_ROUTE } from "../nav/routes";
import SearchBar from "./bar/SearchBar";
import SearchResults from "./results/SearchResults";
import { SuggestionFunctionType } from "./types";

const SELECT_SOURCE_MESSAGE = "Next";
const SELECT_TARGET_MESSAGE = "Finish";

const SEARCH_LIMIT = 20;
export interface SearchProps {
  searchFunction: SuggestionFunctionType;
  onArtifactsSelected: (artifact: Artifact[]) => ArtifactMutatorActionType;
}

export default function Search(props: SearchProps) {
  const [completed, setCompleted] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedArtifacts, setSelectedArtifacts] = useState<Artifact[]>([]);

  const dispatch = useDispatch();
  const currentStep: number = useSelector(getCurrentStep);

  const startSearch = useCallback(
    (searchString: string) => {
      setLoading(true);
      props
        .searchFunction(searchString, SEARCH_LIMIT)
        .then((results: SearchItem[]) => {
          setSearchResults(results);
          setLoading(false);
        })
        .catch((e) => {
          dispatch(setError(e.toString()));
          setLoading(false);
        });
    },
    // eslint-disable-next-line
    [props]
  );

  useEffect(() => startSearch(""), [startSearch]);

  const selectArtifact = (artifact: Artifact) => {
    setSelectedArtifacts([...selectedArtifacts, artifact]);
    setCompleted(false); //changes made, results not up-to-date
  };

  const removeArtifact = (artifact: Artifact) => {
    setSelectedArtifacts(
      selectedArtifacts.filter((a) => !artifactsAreEqual(a, artifact))
    );
    setCompleted(false); //changes made, results not up-to-date
  };

  const handleStepCompleted = () => {
    dispatch(props.onArtifactsSelected(selectedArtifacts));
    const nextStep = currentStep + 1;
    const error = getStepChangeError(nextStep);
    if (error === undefined) {
      setCompleted(true); //changes made, results not up-to-date
      dispatch(changeStep(nextStep));
    } else dispatch(setError(error));
  };

  useEffect(() => {
    if (currentStep === VIEW_TRACE_STEP) appHistory.push(TRACE_VIEW_ROUTE);
  }, [currentStep]);

  return (
    <div className="flexColumn alignContentEnd heightFull overflowYScroll">
      <div className="flexRowContentLeft widthFull padVerticalLight">
        <SearchBar onSearch={startSearch} />
      </div>
      <div
        className="flexRowContentLeft widthFull overflowYScroll"
        style={{ height: selectedArtifacts.length == 0 ? "90%" : "81%" }}
      >
        <SearchResults
          loading={loading}
          results={searchResults}
          selectArtifact={selectArtifact}
          removeArtifact={removeArtifact}
        />
      </div>
      {selectedArtifacts.length > 0 ? (
        <SearchProceedButton
          message={
            currentStep === SELECT_SOURCE_STEP
              ? SELECT_SOURCE_MESSAGE
              : SELECT_TARGET_MESSAGE
          }
          completed={completed}
          onStepCompleted={handleStepCompleted}
        />
      ) : null}
    </div>
  );
}

interface SearchProceedButtonProps {
  message: string;
  completed: boolean;
  onStepCompleted: () => void;
}

function SearchProceedButton(props: SearchProceedButtonProps) {
  const [hover, setHover] = useState(false);

  return (
    <Box
      className="centeredColumn widthFull"
      style={{
        height: "10%",
        backgroundColor: hover ? secondaryColor : primaryColor,
      }}
      boxShadow={3}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={props.onStepCompleted}
    >
      <div className="flexRowCentered widthFull">
        <div className="centeredColumn">
          <label className="bold">{props.message} </label>
        </div>

        <Checkbox
          checked={props.completed}
          color="primary"
          icon={<KeyboardTabIcon color={hover ? "primary" : "secondary"} />}
        />
      </div>
    </Box>
  );
}
