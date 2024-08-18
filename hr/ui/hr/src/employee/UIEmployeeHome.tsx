import React from "react";
import * as icon from "react-icons/bs";
import { widget, hook } from "@marci-ui/lib";
import { UIEmployeeList } from "./UIEmployeeList";

export function UIEmployeeHome() {
  const [ departments, setDepartments ] = React.useState<any[]>([]);
  const [ reload, setReload ] = React.useState<boolean>(false);
  const [ employeeSqlArgs, setEmployeeSqlArgs ] = React.useState<any>({
    ...widget.initSqlArgs(),
    departmentId: null,
  });

  const forceUpdate = () => {
    setReload(!reload);
  }

  const renderDepartmentExplorer = () => {

    const onSelectDepartment = (department: any) => {
      setEmployeeSqlArgs({ ...employeeSqlArgs, departmentId: department.id });
    }

    const delegateEmployee = () => {
      widget.createPopup(
        "Select Employee",
        <UIEmployeeList
          sqlArgs={employeeSqlArgs}
        />
      )
    }

    return (
      <widget.Tree 
        title="Departments TEST TEST XOIIIII" 
        records={departments} 
        displayField="name"
        renderDisplay={(record: any, shouldHavePadding?: boolean) => (
          <span className="clickable mx-1 fw-bold"> {record.name} </span>
          // <span className="flex-h justify-content-between" onClick={(event: any) => onSelectDepartment(record)}>
          //   {/* <icon.BsPlus className="m-1" style={{ cursor: "pointer" }} onClick={delegateEmployee}/> */}
          // </span>
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