import React from "react";
import { ServerResponse } from "server/Interface";
import { rpc } from "server/RPC";

interface useSearchProps {
  successCB: (response: ServerResponse) => void;
  failCB?: (response: ServerResponse) => void;
  component: string;
  service?: string;
  sqlArgs?: any;
  dependency?: any;
}
export function useSearch(props: useSearchProps) {
  const { sqlArgs = {}, successCB, failCB, component, service = "search", dependency } = props;
  React.useEffect(() => {
    rpc.call(component, service, { sqlArgs: sqlArgs }, successCB, failCB);
  }, [dependency])
}