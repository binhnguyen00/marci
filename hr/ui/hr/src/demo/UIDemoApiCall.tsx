import React from "react";
import * as icon from "react-icons/bs";
import { server, widget } from "@marci-ui/lib";

export function UIDemoApiCall() {

  const successCB: server.CallBack = (response: server.ServerResponse) => {
    const item = (<div> {response.body} </div>);
    widget.createPopup("Success", item);
  }

  const failCB: server.CallBack = (response: server.ServerResponse) => {
    const item = (<div> {response.message} </div>);
    widget.createPopup("Fail", item);
  }

  const rpcCall = () => {
    server.rpc.call("DummyService", "helloWorld", {}, successCB, failCB);
  }

  const restCall = () => {
    server.restful.post("/dummy/hello", null, successCB, failCB);
  }

  return (
      <div className="flex-v">
        <h5>API Call</h5>
        <div className="flex-h">
          <widget.Button className="m-1"
            icon={<icon.BsSend />} title="RPC" type="primary" onClick={rpcCall}/>
          <widget.Button className="m-1"
            icon={<icon.BsSend />} title="RESTful" type="primary" onClick={restCall}/>
        </div>
      </div>
  );
}