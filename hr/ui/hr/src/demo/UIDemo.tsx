import React from "react";

import { widget } from "@marci-ui/lib";
import { UIDemoPopup } from "./UIDemoPopup";
import { UIDemoApiCall } from "./UIDemoApiCall";
import { UIDemoDataTable } from "./UIDemoDataTable";
import { UIDemoTooltip } from "./UIDemoTooltip";
import { UIDemoFileExplorer } from "./UIDemoFileExplorer";

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
        <UIDemoTooltip/>
      </div>

      <div className="border-bottom py-2">
        <UIDemoFileExplorer />
      </div>

      <div className="border-bottom">
        {widget.createLoading({ loadingText: "Loading demo...", timeoutIn: 4 })}
      </div>

    </div>
  );
}
