import { Api } from "./Api";
import { CallBack, HttpMethod } from "./Interface";

type RPCRequest = {
  version: string,
  component: string,
  service: string,
  parameters: any
}

export class RPC extends Api { 

  call(path: string, component: string, service: string, params: any, successCB: CallBack, failCB?: CallBack): void {
    const url: string = this.initialUrl(path);
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