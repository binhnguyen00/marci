import React from "react";
import { widget } from "@marci-ui/lib";
import { UIDemoApiCall } from "./UIDemoApiCall";
import { UIDemoPopup } from "./UIDemoPopup";

export function UIDemo() {
  return (
    <div className="flex-v">
      <div className="border-bottom">
        <UIDemoApiCall/>
      </div>
      <div className="border-bottom">
        <UIDemoPopup/>
      </div>
      <div className="border-bottom">
        <h4>Basic Table</h4>
        <widget.BasicTable />
      </div>
    </div>
  );
}
