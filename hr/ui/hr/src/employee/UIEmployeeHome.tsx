import React from "react";
import { widget, hook } from "@marci-ui/lib";
import { UIEmployeeList } from "./UIEmployeeList";

export function UIEmployeeHome() {
  const [ departments, setDepartments ] = React.useState<any[]>([]);
  const [ reload, setReload ] = React.useState<boolean>(false);
  const [ employeeSqlArgs, setEmployeeSqlArgs ] = React.useState<any>(widget.initSqlArgs());

  const forceUpdate = () => {
    setReload(!reload);
  }

  const renderDepartmentExplorer = () => {

    const onSelectDepartment = (department: any) => {
      setEmployeeSqlArgs({ ...employeeSqlArgs, departmentId: department.id });
    }

    return (
      <widget.Tree 
        title="Departments" 
        records={departments} 
        displayField="name"
        renderDisplay={(record: any, shouldHavePadding?: boolean) => (
          <span className="clickable mx-1" onClick={(event: any) => onSelectDepartment(record)}>
            {record.name}
          </span>
        )}
      />
    )
  }

  hook.useSearch({ // Search Departments on component mount
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
          renderDepartmentExplorer()
        ) : (
          widget.createLoading({ loadingText: "Loading...", reloadParent: forceUpdate })
        )}
      </div>
      <div className="p-2" style={{ width: "80%" }}>
        <UIEmployeeList sqlArgs={employeeSqlArgs}/>
      </div>
    </div>
  )
}