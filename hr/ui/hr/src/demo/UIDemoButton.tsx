import React from "react";
import { widget } from "@marci-ui/lib";

export function UIDemoButton() {
  return (
    <div style={{ width: "fit-content" }}>
      <h5>Buttons</h5>

      <div className="flex-h">
        <widget.DropdownButton 
          title="Dropdown" dropDownItems={[
            <div className="text-center"> {"Click Me"} </div>,
            <div className="text-center"> {"Click Me"} </div>,
            <div className="text-center"> {"Click Me"} </div>,
          ]}
        />
        <widget.Popover 
          header={"Header"} title="Popover"
          body={<h1> Body </h1>} placement="bottom"
        />
      </div>

    </div>
  )
}