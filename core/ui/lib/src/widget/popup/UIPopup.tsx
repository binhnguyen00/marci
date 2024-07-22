import React from "react";
import { Popup as ReactPopup } from "reactjs-popup";

declare type PopupPosition = 
  'top left' | 'top center' | 'top right' | 
  'right top' | 'right center' | 'right bottom' | 
  'bottom left' | 'bottom center' | 'bottom right' | 
  'left top' | 'left center' | 'left bottom' | 
  'center center';

declare interface PopupProps {
  position: PopupPosition | PopupPosition[];
  popupAsPage?: boolean; // Modal
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

export function Popup(props: PopupProps) {
  let { position, className, disabled, children, popupAsPage } = props;

  if (disabled === undefined) disabled = false;
  if (popupAsPage === undefined) popupAsPage = false;

  return (
    <div className={className ? className : ""}>
      <ReactPopup 
        trigger={<button> Click to open popup </button>} 
        position={position} 
        children={children ? children : undefined}
        disabled={disabled}
        modal={popupAsPage}
      />
    </div>
  );
}