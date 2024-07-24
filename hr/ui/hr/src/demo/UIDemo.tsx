import React from "react";

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
    </div>
  );
}
