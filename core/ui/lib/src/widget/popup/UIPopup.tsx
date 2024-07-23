import React from "react";
import * as icon from "react-icons/bs"; 

declare interface PopupProps {
  popupItem?: React.ReactElement;
  className?: string;
}

export function Popup(props: PopupProps) {
  let { className = "", popupItem } = props;
  
  console.log(popupItem);
  
  return (
    <> 
      <dialog className="p-0" open>
        <div className="flex-v">
          <div className="flex-h justify-content-end btn p-0">
            <icon.BsXCircleFill size={"1em"} onClick={close}/>
          </div>
          { 
          popupItem ? 
          <div className={className}>
            {popupItem}
          </div> : null
          }
        </div>
      </dialog>
    </>
  )
}