import { CallBack, HttpMethod } from "./Interface";

export abstract class Api {
  serverUrl: string;

  constructor(serverUrl: string) {
    this.serverUrl = serverUrl;
  }

  /**
   * @param path = 'api'
   * @param pathVariables = { search: 'javascript', page: 2, sort: 'desc' }. Usually for HTTP GET
   * @returns https://example.com/api?search=javascript&page=2&sort=desc
   */
  initialUrl(path: string, pathVariables?: any): string {
    if (pathVariables) {
      path = path + '?' + Object.keys(pathVariables).map(function (k) {
        return encodeURIComponent(k) + "=" + encodeURIComponent(pathVariables[k]);
      }).join('&')
    }
    if (path.startsWith('/')) return this.serverUrl + path;
    return this.serverUrl + '/' + path;
  }

  initRequest(method: HttpMethod, requestBody?: any): RequestInit {;
    let body = null;
    if (requestBody) body = JSON.stringify(requestBody);
    let requestInit: RequestInit = {
      method: method,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': "*"
      },
      mode: 'cors',
      cache: 'no-cache',
      // credentials: 'include',
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: body
    }
    return requestInit;
  }

  doFetch(url: string, requestInit: RequestInit, successCB: CallBack, failCB?: CallBack): void {
    fetch(url, requestInit)
    .then((response: any /* ResponseEntity from Springboot */) => {
      if (!response.ok) {
        if (failCB) failCB(response.json());
        return;
      } 
      return response.json();
    }).then((jsonResponse: any) => {
      if (successCB) successCB(jsonResponse);
    }).catch((error: any) => {
      if (failCB) failCB(error);
    });
  }
}
