import React, { useState } from "react";
import { server, input } from "@marci-ui/lib";

export function UIEmployee() {
  const [employee, setEmployee] = useState({});

  const successCB: server.CallBack = (response: any) => {
    console.log("Success");
    console.log(response);
  }

  const failCB: server.CallBack = (response: any) => {
    console.log("Fail");
    console.log(response);
  }

  const restCall = () => {
    server.restful.post("hr/employee/hello", null, successCB, failCB);
  }

  const rpcCall = () => {
    server.rpc.call("EmployeeService", "helloWorld", {}, successCB, failCB);
  }

  const createEmployee = () => {
    const successCB: server.CallBack = (response: any) => {
      console.log("Success");
      console.log(response);
    }
    const failCB: server.CallBack = (response: any) => {
      console.log("Fail");
      console.log(response);
    }
    server.rpc.call("EmployeeService", "save", { employee: employee }, successCB, failCB);
  }

  const handleInputChange = (field: string, newValue: any, rollbackValue: any) => {
    setEmployee((prevState) => ({
      ...prevState,
      [field]: newValue,
    }));
  };

  return (
    <div className="flex-vbox">
      <div className="h1">Employee</div>
      <div>
        <button className="btn btn-primary m-1" onClick={restCall}> RESTful Call </button>
        <button className="btn btn-primary m-1" onClick={rpcCall}> RPC Call </button>
      </div>
      <div className="form-group">
        <div className="h3">Create Employee</div>
        <input.FieldString 
          bean={employee} field="fullName" label="Full Name" onChange={handleInputChange}/>
        <input.FieldString 
          bean={employee} field="nickName" label="Nick Name" onChange={handleInputChange}/>
        <input.FieldString 
          bean={employee} field="dateOfBirth" label="Birthday" onChange={handleInputChange}/>
        <button className="btn btn-primary m-1" onClick={createEmployee}> Create </button>
      </div>
    </div>
  );
}