import React from "react";

import { server } from "@marci-ui/lib";

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
    server.rpc.call("rpc/call", "EmployeeService", "helloWorld", {}, successCB, failCB);
  }

  return (
    <div className="d-flex">
      <h1>Employee</h1>
      <button onClick={restCall}> RESTful Call </button>
      <button onClick={rpcCall}> RPC Call </button>
    </div>
  );
}