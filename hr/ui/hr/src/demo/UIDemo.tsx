import React from "react";
import * as icon from "react-icons/bs";
import { server, widget } from "@marci-ui/lib";

interface UIPopupDemoProps {
  successCB: server.CallBack;
  failCB?: server.CallBack;
}

function UIPopupDemo(props: UIPopupDemoProps) {
  let { successCB, failCB } = props;

  const restCall = () => {
    server.restful.post("/dummy/hello", null, successCB, failCB);
  }

  return (
    <div className="flex-v">
      <div className="h3">Popup Demo</div>
      <widget.Button
        icon={<icon.BsSend />} title="RESTful Call" type="primary" onClick={restCall}/>
    </div>
  )
}

export function UIDemo() {
  const popupRef = React.useRef<any>();

  const closePopupCallback: server.CallBack = (response: server.ServerResponse) => {
    popupRef.current.close();
  }

  const successCB: server.CallBack = (response: server.ServerResponse) => {
    const item = (<div> {response.body} </div>);
    widget.createPopup("Success", item);
  }

  const failCB: server.CallBack = (response: server.ServerResponse) => {
    const item = (<div> {response.message} </div>);
    widget.createPopup("Fail", item);
  }

  const rpcCall = () => {
    server.rpc.call("DummyService", "helloWorld", {}, successCB, failCB);
  }

  const popupBody = (<UIPopupDemo successCB={closePopupCallback} failCB={closePopupCallback}/>);
  return (
    <div className="flex-v">
      <div className="h3">Demo</div>
      <div className="flex-h">
        <widget.Button className="m-1"
          icon={<icon.BsSend />} title="RPC Call" type="primary" onClick={rpcCall}/>
        <widget.ButtonPopup
          ref={popupRef}
          className="m-1" title="Popup" header="Popup" body={popupBody}/>
      </div>
    </div>
  );
}
