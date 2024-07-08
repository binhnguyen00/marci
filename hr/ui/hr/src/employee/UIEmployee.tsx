import { server } from "@marci-ui/lib";
import { useState } from "react";

export function UIEmployee() {
  let [value, setValue] = useState();

  const serverUrl = "http://localhost:7080";
  const rest = new server.RESTful(serverUrl);
  const rpc = new server.RPC(serverUrl);

  const successCB: server.CallBack = (response: any) => {
    console.log("Success");
    console.log(response);
    setValue(response);
  }

  const failCB: server.CallBack = (response: any) => {
    console.log("Fail");
    console.log(response);
    setValue(response);
  }

  const restCall = () => {
    rest.post("hr/emploee/hello", null, successCB, failCB);
  }

  const rpcCall = () => {
    rpc.call("rpc/call", "EmployeeService", "helloWorld", null, successCB, failCB);
  }

  return (
    <div>
      <h1>Employee</h1>
      <button onClick={restCall}> RESTful Call </button>
      <button onClick={rpcCall}> RPC Call </button>
      <div> {value} </div>
    </div>
  );
}