import React from "react";
import { widget } from "@marci-ui/lib";
import { UIEmployeeList } from "./UIEmployeeList";
import { UIDepartmentExplorer } from "../department/UIDepartmentExplorer";

export function UIEmployeeHome() {
  const [ selectedDepartmentId, setSelectedDepartmentId ] = React.useState<number | null>(null);

  const onSelectDepartment = (department: any) => {
    setSelectedDepartmentId(department.id);
  }

  const onSelectRootDepartment = () => {
    setSelectedDepartmentId(null);
  };

  return (
    <div className="h-100">
      <widget.VScreenSplit components={[
        <UIDepartmentExplorer 
          onSelectDepartment={onSelectDepartment}
          onSelectRootDepartment={onSelectRootDepartment}
        />,
        <UIEmployeeList title="Employees" departmentId={selectedDepartmentId}/>
      ]}/>
    </div>
  );
}