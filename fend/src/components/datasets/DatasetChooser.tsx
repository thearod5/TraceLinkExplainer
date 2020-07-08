import CloseIcon from "@material-ui/icons/Close";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Dataset } from "../../../../shared/Dataset";
import { getDatasetByName, getDatasetNames } from "../../api/datasets";
import { RootState } from "../../redux";
import { newPage, selectDataset, unselectDataset } from "../../redux/actions";
import { BORDER_LINE } from "../../styles/constants";
import DatasetItemSummary from "./DatasetItemSummary";

const DEFAULT_INDEX_SELECTED = -1;

function DatasetChooser() {
  const dataset = useSelector((state: RootState) => state.dataset);
  const dispatch = useDispatch();

  const [indexSelected, setIndexSelected] = useState(DEFAULT_INDEX_SELECTED);
  const [datasets, setDatasetsNames] = useState<string[]>([]);

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
      dispatch(newPage(dataset.name));
      setIndexSelected(indexToSelect);
    });
  };

  const deselectDataset = () => {
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
      isSelected={currentIndex === indexSelected}
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
  border-top: ${BORDER_LINE};
`;
export default DatasetChooser;
