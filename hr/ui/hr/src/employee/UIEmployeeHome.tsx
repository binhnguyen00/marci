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
    <div className="flex-h h-100 justify-content-between">
      <div className="border-end w-25">
        {departments.length > 0 ? (
          <widget.Tree records={departments} displayField="name"/>
        ) : (
          widget.createLoading({ loadingText: "Loading...", reloadParent: forceUpdate })
        )}
      </div>
      <div style={{ width: "80%" }}>
        <UIEmployeeList/>
      </div>
    </div>
  )
}