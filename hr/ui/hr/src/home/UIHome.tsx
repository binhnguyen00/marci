import React from "react";

import { UIDemo } from "demo/UIDemo";
import { UIJobList } from "employee/job/UIJobList";
import { UIAccountList } from "account/UIAccountList";
import { UIDepartmentList } from "department/UIDepartmentList";
import { UIEmployeeHome } from "employee/UIEmployeeHome";

export function UIHome() {
  const startPage = <UIDemo/>; 
  const [page, setPage] = React.useState(startPage);

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

        <div 
          className="h1 text-primary clickable" style={homeButtonStyle} 
          onClick={() => setPage(<h1 className="text-center">Welcome to Marci!!!</h1>)}
        >
          Home
        </div>

        <div className="flex-h justify-content-between">
          <div className="clickable p-2" onClick={() => setPage(<UIAccountList title="Accounts"/>)}> Account</div>
          <div className="clickable p-2" onClick={() => setPage(<UIEmployeeHome/>)}> Employee </div>
          <div className="clickable p-2" onClick={() => setPage(<UIJobList title="Jobs"/>) }> Job </div>
          <div className="clickable p-2" onClick={() => setPage(<UIDepartmentList title="Departments"/>) }> Department </div>
          <div className="clickable p-2" onClick={() => setPage(<UIDemo/>) }> Demo </div>
          {/* more pages */}
        </div>

      </div>
      {renderPage()}
    </div>
  );
}