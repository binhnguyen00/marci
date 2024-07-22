import React from "react";
import { Popup as ReactPopup } from "reactjs-popup";
import { PopupPosition } from "reactjs-popup/dist/types";
import { ButtonType } from "../Interface"; 

declare interface ButonPopupProps {
  position: PopupPosition | PopupPosition[];
  popupAsPage?: boolean; // Modal
  popupItem?: React.ReactNode;
  className?: string;
  
  title: string;
  type?: ButtonType
  icon?: JSX.Element;
  disabled?: boolean;
}

export function ButtonPopup(props: ButonPopupProps) {
  let { 
    position, popupItem, icon,
    className = "", disabled = false, popupAsPage = false, title = "untitled", type = "primary",  
  } = props;

  let iconUI = null;
  if (icon) iconUI = <>{icon}</>;
  const triggerButton = (
    <div className={`btn btn-${type ? type : "primary"} ${className}`}>
      {iconUI}
      {title}
    </div>
  )

  return (
    <div className={className}>
      <ReactPopup 
        trigger={triggerButton} 
        position={position} 
        children={popupItem ? popupItem : undefined}
        disabled={disabled}
        modal={popupAsPage}
      />
    </div>
  );
}