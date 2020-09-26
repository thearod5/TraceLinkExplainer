import React from "react";
import DatasetChooser from "../datasets/chooser/DatasetChooser";

export default function Home() {
  return (
    <div className="flexRowCentered sizeFull">
      <div className="centeredColumn">
        <DatasetChooser />
      </div>
    </div>
  );
}
