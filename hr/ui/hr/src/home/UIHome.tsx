import React from "react";
import { widget } from "@marci-ui/lib"; 
import { UIEmployee } from "employee/UIEmployee";
import { UIDemo } from "demo/UIDemo";

export function UIHome() {
  const homeUI = <div className="h3">Welcome to Marci</div>;
  const [page, setPage] = React.useState(homeUI);

  const renderPage = (renderingTarget: React.JSX.Element) => {
    setPage(renderingTarget);
  }

  return (
    <div className="flex-v">
      <div className="flex-h justify-content-between border-bottom align-items-center">
        <div className="h1" onClick={() => renderPage(homeUI)}>Home</div>
        <div className="flex-h">
          <widget.Button title="Employee" type="link" onClick={() => renderPage(<UIEmployee/>)}/>
          <widget.Button title="Demo" type="link" onClick={() => renderPage(<UIDemo/>)}/>
          {/* more pages */}
        </div>
      </div>
      {page}
    </div>
  );
}