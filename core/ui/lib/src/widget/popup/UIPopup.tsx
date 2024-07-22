import React from "react";
import { Popup as ReactPopup } from "reactjs-popup";
import { PopupPosition } from "reactjs-popup/dist/types";

declare interface PopupProps {
  position: PopupPosition | PopupPosition[];
  popupAsPage?: boolean; // Modal
  popupItem?: React.ReactNode;
  className?: string;
}

export function Popup(props: PopupProps) {
  let { className = "", popupAsPage = false, popupItem, position } = props;

  return (
    <div className={className}> 
      <ReactPopup 
        open={true}
        closeOnDocumentClick
        position={position} 
        children={popupItem ? popupItem : undefined}
        modal={popupAsPage}
      />
    </div>
  )
}