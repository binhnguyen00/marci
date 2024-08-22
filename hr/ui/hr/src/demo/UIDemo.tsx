import React from "react";

import { UIDemoPopup } from "./UIDemoPopup";
import { UIDemoApiCall } from "./UIDemoApiCall";
import { UIDemoDataTable } from "./UIDemoDataTable";
import { UIDemoTooltip } from "./UIDemoTooltip";
import { UIDemoFileExplorer } from "./UIDemoFileExplorer";
import { UIDemoReload } from "./UIDemoReload";
import { UIDemoVScreenSplit } from "./UIDemoVScreenSplit";
import { UIDemoButton } from "./UIDemoButton";

export function UIDemo() {

  return (
    <div className="flex-v">

      <div className="border-bottom py-2">
        <UIDemoButton/>
      </div>

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
        <UIDemoFileExplorer/>
      </div>

      <div className="border-bottom py-2">
        <UIDemoReload/>
      </div>

      <div className="border-bottom py-2">
        <UIDemoVScreenSplit/>
      </div>

    </div>
  );
}
