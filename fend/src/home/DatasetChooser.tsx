import CloseIcon from "@material-ui/icons/Close";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { Dataset } from "../../../shared/Dataset";
import { getDatasetByName, getDatasetNames } from "../api/base";
import DatasetItemSummary from "../datasets/DatasetItemSummary";
import { newPage, selectDataset, unselectDataset } from "../redux/actions";

const DEFAULT_INDEX_SELECTED = -1;

function DatasetChooser() {
  const dispatch = useDispatch();

  const [indexSelected, setIndexSelected] = useState(DEFAULT_INDEX_SELECTED);
  const [datasets, setDatasetsNames] = useState<string[]>([]);

  useEffect(() => {
    getDatasetNames().then((res) => setDatasetsNames(res));
  }, []);

  const selectDatasetAtIndex = (indexToSelect: number) => {
    const clickedDatasetName = datasets[indexToSelect];
    getDatasetByName(clickedDatasetName).then((dataset: Dataset) => {
      dispatch(selectDataset(dataset));
      dispatch(newPage(dataset.name));
      setIndexSelected(indexToSelect);
    });
  };

  const deselectDataset = () => {
    console.log("deleselect");
    dispatch(unselectDataset());
    dispatch(newPage(""));
    setIndexSelected(DEFAULT_INDEX_SELECTED);
  };

  const toggleItemAtIndex = (indexClicked: number) => {
    indexClicked === indexSelected
      ? deselectDataset()
      : selectDatasetAtIndex(indexClicked);
  };

  const datasetItems = datasets.map((dataset, currentIndex) => (
    <DatasetItemSummary
      key={dataset}
      dataset={dataset}
      isSelected={currentIndex == indexSelected}
      clickHandler={() => toggleItemAtIndex(currentIndex)}
    />
  ));

  return (
    <ChooserContainer>
      <CloseIcon />
      <Title>Datasets</Title>
      <DatasetItemContainer>
        {datasets.length === 0 ? (
          <LoadingItem>...loading....</LoadingItem>
        ) : (
          datasetItems
        )}
      </DatasetItemContainer>
    </ChooserContainer>
  );
}

const ChooserContainer = styled.div``;

const LoadingItem = styled.p`
  text-align: center;
`;

const Title = styled.h2`
  text-align: center;
`;

const DatasetItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-top: 1px solid black;
`;
export default DatasetChooser;
