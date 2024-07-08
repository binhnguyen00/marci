import { server } from "@marci-ui/lib";

export function UIEmployee() {
  let rest = new server.RESTful("http://localhost:7080");
  let rpc = new server.RPC("http://localhost:7080");

  const successCB: server.CallBack = (response: any) => {
    console.log("Success");
    console.log(response);
  }

  const failCB: server.CallBack = (response: any) => {
    console.log("Fail");
    console.log(response);
  }

  const call = () => {
    rest.post("hr/emploee/hello", null, successCB, failCB);
  }

  return (
    <div>
      <h1>Employee</h1>
      <button onClick={call}></button>
    </div>
  );
}