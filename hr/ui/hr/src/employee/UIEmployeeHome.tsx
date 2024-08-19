import React from "react";
import * as icon from "react-icons/bs";
import { widget, hook, server } from "@marci-ui/lib";
import { UIEmployeeList } from "./UIEmployeeList";

export function UIEmployeeHome() {
  const [departments, setDepartments] = React.useState<any[]>([]);
  const [reload, setReload] = React.useState<boolean>(false);
  const [employeeSqlArgs, setEmployeeSqlArgs] = React.useState<any>({
    ...widget.initSqlArgs(),
    departmentId: null,
  });

  const forceUpdate = () => {
    setReload(!reload);
  };

  const renderDepartmentExplorer = () => {

    const onSelectDepartment = (department: any) => {
      setEmployeeSqlArgs({ ...employeeSqlArgs, departmentId: department.id });
    };

    const delegateEmployee = (department: any) => {

      const onSelectEmployees = (selectedRecords: any[]) => {
        const employeeIds = selectedRecords.map((record: any) => record.id);
        server.rpc.call(
          "DepartmentService", "delegateEmployees", { departmentId: department.id, employeeIds: employeeIds },
          (response: server.ServerResponse) => {
            widget.createSuccessPopup(<>Employees delegated successfully</>);
          },
          (response: server.ServerResponse) => {
            widget.createDangerPopup(<>Failed to delegate employees</>);
          } 
        );
      }

      widget.createPopup(
        "Select Employees",
        <UIEmployeeList sqlArgs={employeeSqlArgs} isSelector selectRowsCallBack={onSelectEmployees}/>
      );
    };

    if (departments.length > 0) {
      return (
        <widget.Tree
          title="Departments"
          records={departments}
          displayField="name"
          renderDisplay={(record: any, shouldHavePadding?: boolean) => (
            <div className="flex-h">
              <span
                className="clickable mx-1 fw-bold"
                onClick={() => onSelectDepartment(record)}
              >
                {record.name}
              </span>
              <div><icon.BsFillPersonPlusFill
                className="m-1"
                style={{ cursor: "pointer" }}
                onClick={() => delegateEmployee(record)}
              /></div>
            </div>
          )}
        />
      );
    } else {
      return widget.createLoading({
        loadingText: "Loading...",
        reloadParent: forceUpdate,
      })
    }
  };

  hook.useSearch({
    component: "DepartmentService", service: "search", sqlArgs: widget.initSqlArgs(),
    updateData: setDepartments, dependencies: [reload],
  });

  return (
    <div className="h-100">
      <widget.VScreenSplit components={[
        renderDepartmentExplorer(),
        <UIEmployeeList sqlArgs={employeeSqlArgs} />
      ]}/>
    </div>
  );
}