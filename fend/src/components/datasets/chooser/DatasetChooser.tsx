import { Box, Button, Fade, LinearProgress } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDatasetByName, getDatasetNames } from "../../../api/datasets";
import {
  changeStep,
  clearData,
  selectDataset,
  setError
} from "../../../redux/actions";
import { getDataset } from "../../../redux/selectors";
import { appHistory } from "../../../redux/store";
import { getStepChangeError } from "../../../shared/pagechanger/PageChanger";
import { Dataset } from "../../../shared/types/Dataset";
import { FADE_TIMEOUT, FIRST_STEP_IN_WIZARD, SELECT_SOURCE_ARTIFACTS } from "../../constants";
import DatasetChooserItem from "./DatasetChooserItem";

const DEFAULT_INDEX_SELECTED = -1;

export default function DatasetChooser() {
  const dataset = useSelector(getDataset);
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
    getDatasetByName(clickedDatasetName).then((dataset: Dataset) => {
      dispatch(selectDataset(dataset))
    }
    );
  };

  const deselectDataset = () => {
    dispatch(clearData());
    setIndexSelected(DEFAULT_INDEX_SELECTED);
  };

  const onRouteSelected = (route: string) => {
    if (route === SELECT_SOURCE_ARTIFACTS) {
      const error = getStepChangeError(FIRST_STEP_IN_WIZARD);
      if (error === undefined) {
        dispatch(changeStep(FIRST_STEP_IN_WIZARD));
        appHistory.push(route);
      } else dispatch(setError(error));
    }
  };

  const datasetItems = datasets.map((dataset, currentIndex) => (
    <DatasetChooserItem
      key={dataset}
      dataset={dataset}
      isSelected={currentIndex === indexSelected}
      select={() => selectDatasetAtIndex(currentIndex)}
      deselect={() => deselectDataset}
      onRouteSelected={onRouteSelected}
    />
  ));

  return (
    <Fade in={true} timeout={FADE_TIMEOUT}>
      <Box className="roundBorder padMedium" boxShadow={3}>
        <h2 className="textAlignCenter">Datasets</h2>
        <div className="flexColumn padSmall">
          {datasets.length === 0 ? (
            <LinearProgress color="secondary" />
          ) : (
              datasetItems
            )}
        </div>
        <div className="flexRowCentered padMedium">
          <Button
            disabled
            size="medium"
            color="primary"
            variant="contained"
          // TODO: Functionality for this
          >
            New Dataset
        </Button>
        </div>
      </Box>
    </Fade>
  );
}
