import React from "react";

import * as icon from "react-icons/bs";
import { widget, hook, server, tableUtils } from "@marci-ui/lib";
import { UIEmployeeList } from "../employee/UIEmployeeList";

interface UIDepartmentExplorerProps {
  onSelectRootDepartment?: () => void;
  onSelectDepartment?: (department: any) => void;
}
export function UIDepartmentExplorer({
  onSelectRootDepartment,
  onSelectDepartment
}: UIDepartmentExplorerProps) {
  const [ departments, setDepartments ] = React.useState<any[]>([]);
  const [ reload, setReload ] = React.useState<boolean>(false);

  const forceUpdate = () => {
    setReload(!reload);
  };

  const delegateEmployee = (department: any) => {
    widget.createPopup(
      "Select Employees",
      <UIEmployeeList 
        departmentId={null} isSelector 
        selectRowsCallBack={(selectedRecords: any[]) => {
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
        }}
      />
    );
  };

  hook.useSearch({
    component: "DepartmentService", service: "search", sqlArgs: tableUtils.initSqlArgs(),
    updateData: setDepartments, dependencies: [reload],
  });

  if (departments.length > 0) {
    return (
      <widget.Tree
        title="Departments"
        records={departments}
        displayField="name"
        parentField="parentId"
        rootTitle="Root"
        onSelectRoot={onSelectRootDepartment}
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
      timeoutIn: 1.5,
      timeoutContent: (
      <div>
        <div className="text-center">{"No departments were found :("}</div>
        <widget.Button 
          className="flex-v justify-content-center"
          title="Retry?" type="link" icon={<icon.BsArrowClockwise/>} 
          onClick={(event: any) => forceUpdate()}/>
      </div>
      )
    })
  }
}

