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
        title="Departments Tran Bim" 
        records={departments} 
        displayField="name"
        renderDisplay={(record: any, shouldHavePadding?: boolean) => (
          <div className="flex-h">
            <span className="clickable mx-1 fw-bold" onClick={() => onSelectDepartment(record)}> 
              {record.name} 
            </span>
            <icon.BsFillPersonPlusFill className="m-1" style={{ cursor: "pointer" }} onClick={delegateEmployee}/>
          </div>
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
        style={{ width: 300 }} // <- Horizontal scroll
      >
        {departments.length > 0 ? (
          renderDepartmentExplorer()
        ) : (
          widget.createLoading({ loadingText: "Loading...", reloadParent: forceUpdate })
        )}
      </div>
      <div className="p-2" style={{ width: "75%" }}>
        <UIEmployeeList sqlArgs={employeeSqlArgs}/>
      </div>
    </div>
  )
}