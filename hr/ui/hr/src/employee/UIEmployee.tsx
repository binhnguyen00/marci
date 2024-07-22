import React, { useState } from "react";
import * as icon from "react-icons/bs";
import { server, input, widget } from "@marci-ui/lib";

export function UIEmployeeForm() {
  const [employee, setEmployee] = useState({});

  const handleInputChange = (field: string, newValue: any, rollbackValue: any) => {
    setEmployee((prevState) => ({
      ...prevState,
      [field]: newValue,
    }));
  };

  const createEmployee = () => {
    const successCB: server.CallBack = (response: server.ServerResponse) => {
      console.log("Success");
      console.log(response);
    }
    const failCB: server.CallBack = (response: server.ServerResponse) => {
      console.log("Fail");
      console.log(response);
    }
    server.rpc.call("EmployeeService", "save", { employee: employee }, successCB, failCB);
  }

  return (
    <div className="form-group p-1 border">
      <div className="h3">Create Employee</div>
      <input.FieldString 
        bean={employee} field="fullName" label="Full Name" onChange={handleInputChange}/>
      <input.FieldString 
        bean={employee} field="nickName" label="Nick Name" onChange={handleInputChange}/>
      <input.FieldString 
        bean={employee} field="dateOfBirth" label="Birthday" onChange={handleInputChange}/>

      <widget.Button 
        icon={<icon.BsPlus />}
        title="Create" type="primary" onClick={createEmployee}/>
    </div>
  )
}

export function UIEmployee() {
  return (
    <div className="flex-vbox justify-content-between">
      <div className="h3">Employee</div>
      <widget.ButtonPopup className="m-1"
        title="Create Employee" position={"center center"} popupAsPage popupItem={UIEmployeeForm()}/>
    </div>
  );
}