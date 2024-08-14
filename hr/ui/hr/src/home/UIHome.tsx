import React from "react";

import { widget } from "@marci-ui/lib"; 
import { UIEmployeeList } from "employee/UIEmployeeList";
import { UIDemo } from "demo/UIDemo";
import { UIAccountList } from "account/UIAccountList";
import { UIJobList } from "employee/job/UIJobList";
import { UIDepartmentList } from "department/UIDepartmentList";

export function UIHome() {
  const homeUI = <div className="h4 text-center">Welcome to Marci</div>;
  const [page, setPage] = React.useState(homeUI);

  const renderPage = React.useCallback(() => {
    return (
      <div style={{ height: "100%" }}>
        {page}
      </div>
    );
  }, [page]);

  const homeButtonStyle: React.CSSProperties = {
    fontWeight: "bold",
  }

  return (
    <div className="flex-v" style={{ height: "100%" }}>
      <div className="flex-h justify-content-between border-bottom align-items-center">
        <div className="h1 text-primary" style={homeButtonStyle} onClick={() => setPage(homeUI)}>Home</div>
        <div className="flex-h">
          <widget.Button title="Account" type="link" onClick={() => setPage(<UIAccountList title="Accounts"/>)}/>
          <widget.Button title="Employee" type="link" onClick={() => setPage(<UIEmployeeList title="Employees"/>)}/>
          <widget.Button title="Job" type="link" onClick={() => setPage(<UIJobList title="Jobs"/>)}/>
          <widget.Button title="Department" type="link" onClick={() => setPage(<UIDepartmentList title="Departments Minh"/>)}/>
          <widget.Button title="Demo" type="link" onClick={() => setPage(<UIDemo/>)}/>
          {/* more pages */}
        </div>
      </div>
      {renderPage()}
    </div>
  );
}