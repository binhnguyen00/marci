import { Api } from "./Api";
import { CallBack, HttpMethod } from "./Interface";

export class RPC extends Api { 

  call(path: string, service: string, method: string, params: any, successCB: CallBack, failCB: CallBack): void {
    var url: string = this.initialUrl(path);
    var requestInit: RequestInit = this.initRequest(HttpMethod.POST, {
      version: '1.0',
      component: service,
      method: method,
      params: params
    });
    this.doFetch(url, requestInit, successCB, failCB);
  }
}