import React from "react";
import { useSelector } from "react-redux";
import SplitterLayout from "react-splitter-layout";
import "react-splitter-layout/lib/index.css";
import DatasetChooser from "../datasets/DatasetChooser";
import DatasetSummary from "../datasets/DatasetSummary";
import { RootState } from "../redux";
import "../styles/App.css";
import NoDatasetFound from "./NoDatasetFound";

function Home() {
  const dataset = useSelector((state: RootState) => state.dataset);
  console.log(dataset);
  const leftPanel =
    dataset.name !== "" ? (
      <DatasetSummary dataset={dataset}></DatasetSummary>
    ) : (
      <NoDatasetFound />
    );

  return (
    <SplitterLayout
      percentage={true}
      secondaryInitialSize={25}
      primaryMinSize={75}
    >
      {leftPanel}
      <DatasetChooser />
    </SplitterLayout>
  );
}

export default Home;
