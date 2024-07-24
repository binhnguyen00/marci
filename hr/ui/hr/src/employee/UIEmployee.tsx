import React from "react";
import * as icon from "react-icons/bs";
import { server, input, widget } from "@marci-ui/lib";

export function UIEmployeeForm() {
  const [employee, setEmployee] = React.useState({});

  const handleInputChange = (field: string, newValue: any, rollbackValue: any) => {
    setEmployee((prevState) => ({
      ...prevState,
      [field]: newValue,
    }));
  };

  const createEmployee = () => {

    const successCB: server.CallBack = (response: server.ServerResponse) => {
      const html = (<div> {JSON.stringify(response.body, null, 2)} </div>)
      widget.closeCurrentPopup();  
      widget.createPopup("Success", html);
    }
    const failCB: server.CallBack = (response: server.ServerResponse) => {
      const html = (<div> {JSON.stringify(response.message, null, 2)} </div>)
      widget.closeCurrentPopup();
      widget.createPopup("Fail", html);
    }

    server.rpc.call("EmployeeService", "save", { employee: employee }, successCB, failCB);
  }

  return (
    <div className="form-group p-1 border">
      <input.FieldString 
        bean={employee} field="fullName" label="Full Name" onChange={handleInputChange}/>
      <input.FieldString 
        bean={employee} field="nickName" label="Nick Name" onChange={handleInputChange}/>
      <input.FieldString 
        bean={employee} field="dateOfBirth" label="Birthday" onChange={handleInputChange}/>

      <widget.Button 
        icon={<icon.BsSaveFill />}
        title="Save" type="primary" onClick={createEmployee}/>
    </div>
  )
}

export function UIEmployee() {
  const [ employeeData, setEmployeeData ] = React.useState<Array<any>>([]);
  const config: widget.DataTableConfig = {
    title: "Employees",
    columnConfig: [
      { field: "fullName", headerName: "Full Name", width: 200 },
      { field: "nickName", headerName: "Nick Name", width: 200 },
      { field: "dateOfBirth", headerName: "Birthday", width: 200 },
    ],
    rows: employeeData,
  }

  const showEmployeeForm = () => {
    widget.createPopup("Create Employee", <UIEmployeeForm />);
  }

  const successCB: server.CallBack = (response: server.ServerResponse) => {
    const employees = response.body as any[];
    setEmployeeData(employees);
  }

  React.useEffect(() => {
    const searchParams = {} as any;
    server.rpc.call("EmployeeService", "search", { params: searchParams }, successCB);
  }, [])
  
  return (
    <div className="flex-v">
      <widget.DataTable config={config}/>
      <widget.Button icon={<icon.BsPlus />}
        className="m-1" title="Create" onClick={showEmployeeForm}/>
    </div>
  );
}