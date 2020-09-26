import React from "react";

const helpMessage = "No source artifact selected.";

export default function NoSourceMessage() {
  return (
    <div className="textAlignCenter">
      <p className="verticallyCenter">{helpMessage}</p>
    </div>
  );
}
