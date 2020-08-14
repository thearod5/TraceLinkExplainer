import { Box, Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { getDatasetByName, getDatasetNames } from "../../api/datasets";
import {
  changeStep,
  clearData,
  selectDataset,
  setError,
} from "../../redux/actions";
import { getCurrentStep, getDataset } from "../../redux/selectors";
import { appHistory } from "../../redux/store";
import { FIRST_STEP_IN_WIZARD } from "../../shared/pagechanger/constants";
import { getStepChangeError } from "../../shared/pagechanger/PageChanger";
import { Dataset } from "../../shared/types/Dataset";
import { SELECT_ARTIFACTS_ROUTE } from "../nav/routes";
import DatasetItem from "./item/DatasetItem";

const DEFAULT_INDEX_SELECTED = -1;
const UNIMPLEMENTED_NEW_DATASET_ERROR =
  "Adding a new dataset is not yet implemented.";

function DatasetChooser() {
  const dataset = useSelector(getDataset);
  const currentStep = useSelector(getCurrentStep);
  const dispatch = useDispatch();

  const [indexSelected, setIndexSelected] = useState(DEFAULT_INDEX_SELECTED);
  const [datasets, setDatasetsNames] = useState<string[]>([]);

  useEffect(() => {
    dispatch(changeStep(0));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getDatasetNames().then((names) => {
      names.map((name, index) =>
        dataset.name === name ? setIndexSelected(index) : null
      );
      setDatasetsNames(names);
    });
  }, [dataset.name]);

  const selectDatasetAtIndex = (indexToSelect: number) => {
    const clickedDatasetName = datasets[indexToSelect];
    getDatasetByName(clickedDatasetName).then((dataset: Dataset) =>
      dispatch(selectDataset(dataset))
    );
  };

  const deselectDataset = () => {
    dispatch(clearData());
    setIndexSelected(DEFAULT_INDEX_SELECTED);
  };

  const onRouteSelected = (route: string) => {
    if (route === SELECT_ARTIFACTS_ROUTE) {
      const error = getStepChangeError(FIRST_STEP_IN_WIZARD);
      if (error === undefined) {
        dispatch(changeStep(FIRST_STEP_IN_WIZARD));
        appHistory.push(route);
      } else dispatch(setError(error));
    }
  };

  console.log("CURRENT STEP: ", currentStep);

  const datasetItems = datasets.map((dataset, currentIndex) => (
    <DatasetItem
      key={dataset}
      dataset={dataset}
      isSelected={currentIndex === indexSelected}
      select={() => selectDatasetAtIndex(currentIndex)}
      deselect={() => deselectDataset}
      onRouteSelected={onRouteSelected}
    />
  ));

  return (
    <Box className="roundBorder" boxShadow={3}>
      <Title>Datasets</Title>
      <DatasetItemContainer>
        {datasets.length === 0 ? (
          <LoadingItem>...loading....</LoadingItem>
        ) : (
          datasetItems
        )}
      </DatasetItemContainer>
      <NewDatasetButtonContainer>
        <NewDatasetButton
          size="large"
          color="primary"
          variant="contained"
          onClick={() => alert(UNIMPLEMENTED_NEW_DATASET_ERROR)}
          // TODO: Functionality for this
        >
          New Dataset
        </NewDatasetButton>
      </NewDatasetButtonContainer>
    </Box>
  );
}

const LoadingItem = styled.p`
  text-align: center;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 10px;
  font-weight: normal;
  padding: 10px;
`;

const DatasetItemContainer = styled.div`
  display: flex;
  flex-grow: 4;
  flex-direction: column;
  padding: 10px;
`;

//TODO: Make so its 10px or something FROM the bottom
const NewDatasetButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;
  margin-bottom: 20px;
`;

const NEW_DATASET_BUTTON_WIDTH = 100;
const NEW_DATASET_BUTTON_HEIGHT = 100;

const NewDatasetButton = styled(Button)`
  height: ${NEW_DATASET_BUTTON_HEIGHT}px;
  width: ${NEW_DATASET_BUTTON_WIDTH}px;
`;
export default DatasetChooser;
