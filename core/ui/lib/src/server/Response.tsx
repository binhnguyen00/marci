export class Response {
  headers: Array<any>;
  body: any;

  constructor(headers: Array<any>, body: any) {
    this.headers = headers;
    this.body = body;
  }
}