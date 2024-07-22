import React from "react";
import ReactDOM from "react-dom/client";
import { widget } from "@marci-ui/lib"; 
import { UIEmployee } from "employee/UIEmployee";
import { UIDemo } from "demo/UIDemo";

function renderUIEmployeePage(renderingTarget: React.ReactNode) {
  ReactDOM.createRoot(document.getElementById("app")!).render(
    renderingTarget
  )
}

export function UIHome() {
  return (
    <div className="flex-v">
      <div className="flex-hbox justify-content-between border-bottom align-items-center">
        <div className="h1">Home</div>
        <div className="flex-hbox">
          <widget.Button title="Employee" type="link" onClick={() => renderUIEmployeePage(<UIEmployee/>)}/>
          <widget.Button title="Demo" type="link" onClick={() => renderUIEmployeePage(<UIDemo/>)}/>
          {/* more pages */}
        </div>
      </div>
      <div id="app"></div>
    </div>
  );
}