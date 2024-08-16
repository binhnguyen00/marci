import React from "react";

import { widget } from "@marci-ui/lib";
import { UIDemoPopup } from "./UIDemoPopup";
import { UIDemoApiCall } from "./UIDemoApiCall";
import { UIDemoDataTable } from "./UIDemoDataTable";

export function UIDemo() {

  return (
    <div className="flex-v">

      <div className="border-bottom py-2">
        <UIDemoApiCall/>
      </div>

      <div className="border-bottom py-2">
        <UIDemoPopup/>
      </div>

      <div className="py-2">
        <UIDemoDataTable/>
      </div>

      <div className="border-bottom py-2">
        <h4>Tooltips</h4>
        <widget.Tooltip position="right"
          tooltip={<widget.Button disabled className="mx-1" title="Right Tooltip"/>}
          content={"This is a right tooltip"}/>
        <widget.Tooltip position="bottom"
          tooltip={<widget.Button disabled className="mx-1" title="Bottom Tooltip"/>}
          content={"This is a bottom tooltip"}/>
        <widget.Tooltip position="top"
          tooltip={<widget.Button disabled className="mx-1" title="Top Tooltip"/>}
          content={"This is a top tooltip"}/>
        <widget.Tooltip position="left"
          tooltip={<widget.Button disabled className="mx-1" title="Left Tooltip"/>}
          content={"This is a left tooltip"}/>
      </div>

    </div>
  );
}
