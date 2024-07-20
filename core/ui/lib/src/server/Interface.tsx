export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE'
}

export enum ResponseStatus {
  OK = "OK", ERROR = "ERROR", UNAUTHORIZED = "UNAUTHORIZED"
}

export type ServerResponse = {
  component: string | "unknown",
  service: string | "unknown",
  status: ResponseStatus,
  message?: string,
  body?: any,

  startTimestamp: number,
  finishTimestamp: number,
  executionTimestamp: number,
}

export type CallBack = (response: ServerResponse) => void;