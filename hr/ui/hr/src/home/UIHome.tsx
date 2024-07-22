import React, { useState } from "react";
import { widget } from "@marci-ui/lib"; 
import { UIEmployee } from "employee/UIEmployee";
import { UIDemo } from "demo/UIDemo";

export function UIHome() {
  const homeUI = <div className="h3">Welcome to Marci</div>;
  const [page, setPage] = useState(homeUI);

  const renderUIEmployeePage = (renderingTarget: React.JSX.Element) => {
    setPage(renderingTarget);
  }

  return (
    <div className="flex-v">
      <div className="flex-h justify-content-between border-bottom align-items-center">
        <div className="h1" onClick={() => renderUIEmployeePage(homeUI)}>Home</div>
        <div className="flex-h">
          <widget.Button title="Employee" type="link" onClick={() => renderUIEmployeePage(<UIEmployee/>)}/>
          <widget.Button title="Demo" type="link" onClick={() => renderUIEmployeePage(<UIDemo/>)}/>
          {/* more pages */}
        </div>
      </div>
      {page}
    </div>
  );
}