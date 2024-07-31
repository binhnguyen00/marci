import React from "react";
import { server, widget } from "@marci-ui/lib";
import { RPCRequest } from "../interface/common";
import "./scss/index.scss";

/** 
 * Usage: should be use for List components through out the project
 * Classes name format:UI<your-class-name>List.tsx
 * For example: UIEmployeeList.tsx
 */

export interface ShowRowDetailsRequest {
  id: any;
  cellValue: any;
  rpcRequest: RPCRequest;
  callBack: (entity: any) => void;
}
export function renderCellGetRecordById(request: ShowRowDetailsRequest) {
  let { id, cellValue, rpcRequest, callBack } = request;
  
  const successCB: server.CallBack = (response: server.ServerResponse) => {
    const javaEntity = response.body as any;
    callBack(javaEntity);
  }

  const failCB: server.CallBack = (response: server.ServerResponse) => {
    const error = response.message;
    const html = (<div> {JSON.stringify(error, null, 2)} </div>)
    widget.closeCurrentPopup();
    widget.createPopup("Fail", html);
  }

  return (
    <a style={{ textDecoration: "none" }} href="#" onClick={() => {
      server.rpc.call(rpcRequest.component, rpcRequest.service, { id: id }, successCB, failCB);
    }}>
      <div className="cell-clickable"> {cellValue} </div>
    </a>
  )
}

export * as ListUtils from "./ListUtils"