import React from "react";
import { widget } from "@marci-ui/lib";
import { UIEmployeeList } from "./UIEmployeeList";
import { UIDepartmentExplorer } from "../department/UIDepartmentExplorer";

export function UIEmployeeHome() {
  const [ selectedDepartment, setSelectedDepartment ] = React.useState<any>(null);

  const onSelectDepartment = (department: any) => {
    setSelectedDepartment(department);
  }

  const onSelectRootDepartment = () => {
    setSelectedDepartment(null);
  };

  return (
    <div className="h-100">
      <widget.VScreenSplit components={[
        <UIDepartmentExplorer 
          onSelectDepartment={onSelectDepartment}
          onSelectRootDepartment={onSelectRootDepartment}
        />,
        <UIEmployeeList 
          title={`Employees ${selectedDepartment ? `(${selectedDepartment.name})` : ""}`} 
          departmentId={selectedDepartment ? selectedDepartment.id : null}/>
      ]}/>
    </div>
  );
}