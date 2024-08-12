import React from "react";

import { UIDemoPopup } from "./UIDemoPopup";
import { UIDemoApiCall } from "./UIDemoApiCall";
import { UIDemoDataTable } from "./UIDemoDataTable";

export function UIDemo() {

  return (
    <div className="flex-v">

      <h1>Demo</h1>

      <div className="border-bottom py-2">
        <UIDemoApiCall/>
      </div>
      <div className="border-bottom py-2">
        <UIDemoPopup/>
      </div>
      <div className="border-bottom py-2">
        <UIDemoDataTable/>
      </div>
    </div>
  );
}
