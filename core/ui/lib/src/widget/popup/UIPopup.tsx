import React from "react";

declare interface PopupProps {
  popupAsPage?: boolean; // Modal
  popupItem?: React.ReactNode;
  className?: string;
}

export function Popup(props: PopupProps) {
  let { className = "", popupAsPage = false, popupItem } = props;

  return (
    <div className={className}> 
    </div>
  )
}