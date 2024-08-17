import React from "react";

import { widget } from "@marci-ui/lib";

export function UIDemoTooltip() {
  return (
    <>
      <h5>Tooltips</h5>
      <widget.Tooltip position="right"
        tooltip={<div className="mx-1 border p-1"> Right Tooltip </div>}
        content={"This is a right tooltip"}/>
      <widget.Tooltip position="bottom"
        tooltip={<div className="mx-1 border p-1"> Bottom Tooltip </div>}
        content={"This is a bottom tooltip"}/>
      <widget.Tooltip position="top"
        tooltip={<div className="mx-1 border p-1"> Top Tooltip </div>}
        content={"This is a top tooltip"}/>
      <widget.Tooltip position="left"
        tooltip={<div className="mx-1 border p-1"> Left Tooltip </div>}
        content={"This is a left tooltip"}/>
    </>
  );
}