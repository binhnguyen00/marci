export class RESTful {
  baseURL: string;
  serverURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    this.serverURL = baseURL;
  }

  post() {
    return this.doFetch() + " As POST";
  }

  doFetch() {
    return "DO Fetch";
  }
}