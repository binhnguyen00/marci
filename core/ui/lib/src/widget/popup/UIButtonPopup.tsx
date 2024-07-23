import React from "react";
import { ButtonType } from "../Interface"; 

declare interface ButonPopupProps {
  popupAsPage?: boolean; // Modal
  popupItem?: React.ReactNode;
  className?: string;
  
  title: string;
  type?: ButtonType
  icon?: JSX.Element;
  disabled?: boolean;
}

export function ButtonPopup(props: ButonPopupProps) {
  let { popupItem, icon, className = "", disabled = false, popupAsPage = false, title = "untitled", type = "primary" } = props;

  let iconUI = null;
  if (icon) iconUI = <>{icon}</>;

  return (
    <div className={className}>
    </div>
  );
}