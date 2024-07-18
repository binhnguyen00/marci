import React from "react";
import { server, input } from "@marci-ui/lib";

export function UIEmployee() {
  console.log(server);

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

  return (
    <div className="flex-vbox">
      <div className="h1">Employee</div>
      <div className="form-group">
        <input.FieldString 
          bean={{}} field="name" label="Name" disable={false} />
        <button className="btn btn-primary" onClick={restCall}> RESTful Call </button>
        <button className="btn btn-primary" onClick={rpcCall}> RPC Call </button>
      </div>
    </div>
  );
}