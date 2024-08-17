import React from "react";
import { widget, hook } from "@marci-ui/lib";
import { UIEmployeeList } from "./UIEmployeeList";

export function UIEmployeeHome() {
  const [ departments, setDepartments ] = React.useState<any[]>([]);
  const [ reload, setReload ] = React.useState<boolean>(false);

  const forceUpdate = () => {
    setReload(!reload);
  }

  hook.useSearch({
    component: "DepartmentService", service: "search", sqlArgs: widget.initSqlArgs(),
    updateData: setDepartments, dependencies: [reload],
  })

  return (
    <div className="flex-h h-100">
      <div 
        className="border-end" 
        style={{ width: "20%", overflow: "auto", whiteSpace: "nowrap" }} // <- Horizontal scroll
      >
        {departments.length > 0 ? (
          <widget.Tree 
            title="Departments" 
            records={departments} 
            displayField="name"
            renderDisplay={(record: any, shouldHavePadding?: boolean) => (
              <span className="clickable" onClick={() => { /* Update sqlArgs: search employees by departmentId */ }}>
                {record.name}
              </span>
            )}
          />
        ) : (
          widget.createLoading({ loadingText: "Loading...", reloadParent: forceUpdate })
        )}
      </div>
      <div className="p-2" style={{ width: "80%" }}>
        <UIEmployeeList/>
      </div>
    </div>
  )
}