import React from "react";
import { ServerResponse } from "server/Interface";
import { rpc } from "server/RPC";
import * as PopupManager from "../widget/popup/PopupManager";

interface useSearchProps {
  component: string;
  service?: string;
  sqlArgs?: any;
  dependencies?: React.DependencyList;
  updateData:  React.Dispatch<React.SetStateAction<any[]>>;
}
export function useSearch(props: useSearchProps) {
  const { sqlArgs = {}, component, service = "search", dependencies, updateData } = props;

  const successCB = (response: ServerResponse) => {
    const dataAsArray = response.body as any[];
    updateData(dataAsArray);
    return;
  };

  const failCB = (response: ServerResponse) => {
    PopupManager.createDangerPopup(<div> {response.message} </div>, "Search Error");
    return;
  }

  React.useEffect(() => {
    rpc.call(component, service, { sqlArgs: sqlArgs }, successCB, failCB);
  }, dependencies);
}