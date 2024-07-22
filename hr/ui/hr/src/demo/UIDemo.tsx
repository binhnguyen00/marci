import React from "react";
import * as icon from "react-icons/bs";
import { server, widget } from "@marci-ui/lib";

export function UIDemo() {

  const successCB: server.CallBack = (response: server.ServerResponse) => {
    console.log("Success");
    console.log(response);
  }

  const failCB: server.CallBack = (response: server.ServerResponse) => {
    console.log("Fail");
    console.log(response);
  }

  const restCall = () => {
    server.restful.post("/dummy/hello", null, successCB, failCB);
  }

  const rpcCall = () => {
    server.rpc.call("DummyService", "helloWorld", {}, successCB, failCB);
  }

  return (
    <div className="flex-v">
      <div className="h3">Demo</div>
      <div className="flex-h">
        <widget.Popup 
          position={"center center"} popupAsPage popupItem={<div className="border h1 p-5">Introducing Demo</div>}/>
        <widget.Button className="m-1"
          icon={<icon.BsSend />} title="RESTful Call" type="primary" onClick={rpcCall}/>
        <widget.Button className="m-1"
          icon={<icon.BsSend />} title="RPC Call" type="primary" onClick={restCall}/>
      </div>
    </div>
  );
}