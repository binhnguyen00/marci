import React from "react";
import * as bsIcon from "react-icons/bs";
import { ButtonType } from "../Interface";
import { Button } from "../button/UIButton";

declare interface ButonPopupProps {
  popupItem?: React.ReactElement;
  className?: string;
  
  title: string;
  type?: ButtonType;
  icon?: JSX.Element;
  disabled?: boolean;
}

export const ButtonPopup = React.forwardRef((props: ButonPopupProps, ref) => {
  let { popupItem, icon, className = "", disabled = false, title = "untitled", type = "primary" } = props;
  const popupRef = React.useRef<HTMLDialogElement | null>(null);

  React.useImperativeHandle(ref, () => ({
    close: () => {
      if (popupRef.current) popupRef.current.close();
    }
  }));

  const popup = () => {
    if (popupRef.current) popupRef.current.showModal();
  };

  const close = () => {
    if (popupRef.current) popupRef.current.close();
  };

  return (
    <>
      <dialog ref={popupRef} className="p-0">
        <div className="flex-v">
          <div className="flex-h justify-content-end btn p-0">
            <bsIcon.BsXCircleFill size={"1em"} onClick={close}/>
          </div>
          { 
          popupItem ? 
          <div className={className}>
            {popupItem}
          </div> : null
          }
        </div>
      </dialog>
      <Button 
        className={className} title={title} type={type} 
        icon={icon} disabled={disabled} onClick={popup}/>
    </>
  );
});
