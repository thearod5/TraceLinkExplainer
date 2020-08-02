import { Box, Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Dataset } from "../../../../shared/Dataset";
import { getDatasetByName, getDatasetNames } from "../../api/datasets";
import { RootState } from "../../redux";
import { changeStep, clearData, selectDataset } from "../../redux/actions";
import DatasetAccordion from "./accordion/DatasetAccordion";

const DEFAULT_INDEX_SELECTED = -1;
const UNIMPLEMENTED_NEW_DATASET_ERROR =
  "Adding a new dataset is not yet implemented.";

interface DatasetChooserProps {}

function DatasetChooser(props: DatasetChooserProps) {
  const dataset = useSelector((state: RootState) => state.dataset);
  const dispatch = useDispatch();

  const [indexSelected, setIndexSelected] = useState(DEFAULT_INDEX_SELECTED);
  const [datasets, setDatasetsNames] = useState<string[]>([]);

  useEffect(() => {
    dispatch(changeStep(0, undefined));
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
    getDatasetByName(clickedDatasetName).then((dataset: Dataset) => {
      dispatch(selectDataset(dataset));
    });
  };

  const deselectDataset = () => {
    dispatch(clearData());
    setIndexSelected(DEFAULT_INDEX_SELECTED);
  };

  const datasetItems = datasets.map((dataset, currentIndex) => (
    <DatasetAccordion
      key={dataset}
      dataset={dataset}
      isSelected={currentIndex === indexSelected}
      select={() => selectDatasetAtIndex(currentIndex)}
      deselect={() => deselectDataset}
    />
  ));

  return (
    <DatasetChooserContainer boxShadow={3}>
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
          variant="contained"
          disabled
          onClick={() => alert(UNIMPLEMENTED_NEW_DATASET_ERROR)}
          // TODO: Functionality for this
        >
          New Dataset
        </NewDatasetButton>
      </NewDatasetButtonContainer>
    </DatasetChooserContainer>
  );
}

//TODO: Remove manual top margin
const DatasetChooserContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 5px;
  padding: auto;
  margin-top: 150px;
`;

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
