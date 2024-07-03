export class RESTful {
  serverURL: string;
  baseURL: string;

  constructor(baseURL: string, serverURL: string) {
    this.baseURL = baseURL;
    this.serverURL = serverURL;
  }

  getServerURL() { return this.serverURL; }

  getBaseURL() { return this.baseURL; }

  post() {
    return "Post test";
  }

  get() {
    return "Get test"
  }
}