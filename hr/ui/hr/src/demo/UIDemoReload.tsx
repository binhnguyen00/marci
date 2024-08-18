import React from "react";
import { widget } from "@marci-ui/lib";

export function UIDemoReload() {
  const [reload, setReload] = React.useState(false);

  const triggerReload = () => {
    setReload(!reload);
  };

  return (
    <>
      {widget.createLoading({
        loadingText: "Loading demo...",
        timeoutIn: 4,
        reloadParent: triggerReload,
      })}
    </>
  );
}
