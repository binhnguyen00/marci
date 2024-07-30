import React from "react";
import { Api } from "./Api";
import { CallBack, HttpMethod, ServerResponse } from "./Interface";
import * as PopupManager from "../widget/popup/PopupManager";

type RPCRequest = {
  version: string,
  component: string,
  service: string,
  parameters: any
}

export class RPC extends Api { 

  call(component: string, service: string, params: any, successCB: CallBack, failCB?: CallBack): void {
    
    if (!failCB) failCB = (response: ServerResponse) => {
      const errorTitle = (<div className="text-danger"> {response.message} </div>);
      const errorContent = (<div> {response.message} </div>);
      PopupManager.createPopup(errorTitle, errorContent);
    }

    const url: string = this.initialUrl("rpc/call");
    const rpcRequest: RPCRequest = {
      version: '1.0',
      component: component,
      service: service,
      parameters: params
    };
    const requestInit: RequestInit = this.initRequest(HttpMethod.POST, rpcRequest);
    this.doFetch(url, requestInit, successCB, failCB);
  }
}

const rpc = new RPC("http://localhost:7080");
export { rpc };