import React from "react";
import { useSelector } from "react-redux";
import SplitterLayout from "react-splitter-layout";
import "react-splitter-layout/lib/index.css";
import { Dataset } from "../../../shared/Dataset";
import DatasetSummary from "../datasets/DatasetSummary";
import "../styles/App.css";
import DatasetChooser from "./DatasetChooser";
import NoDatasetFound from "./NoDatasetFound";

function Home() {
  const dataset = useSelector((state: Dataset) => state);
  const leftPanel =
    dataset.name !== "" ? (
      <DatasetSummary dataset={dataset}></DatasetSummary>
    ) : (
      <NoDatasetFound />
    );

  return (
    <SplitterLayout percentage={true} primaryMinSize={50}>
      {leftPanel}
      <DatasetChooser></DatasetChooser>
    </SplitterLayout>
  );
}

export default Home;
