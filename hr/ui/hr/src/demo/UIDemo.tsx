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
      <div className="border-bottom py-2">
        <UIDemoDataTable/>
      </div>
      <div className="border-bottom py-2">
        <widget.Tooltip position="right"
          tooltip={<widget.Button disabled className="mx-1" title="Tran Minh Thu"/>}
          content={"Lorem ipsum dolor sit amet consectetur adipisicing elit asd"}/>
      </div>
    </div>
  );
}
