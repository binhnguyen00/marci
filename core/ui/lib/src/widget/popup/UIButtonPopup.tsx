import React from "react";
import * as bsIcon from "react-icons/bs";
import { ButtonType } from "../Interface";
import { Button } from "../button/UIButton";

declare interface ButonPopupProps {
  header?: React.ReactElement | string;  
  body?: React.ReactElement;
  className?: string;
  
  title?: string;
  type?: ButtonType;
  icon?: JSX.Element;
  disabled?: boolean;
}

export const ButtonPopup = React.forwardRef((props: ButonPopupProps, ref) => {
  let { header, body, icon, className = "", disabled = false, title = "untitled", type = "primary" } = props;
  const popupRef = React.useRef<HTMLDialogElement | null>(null);

  React.useImperativeHandle(ref, () => ({
    close: () => {
      if (popupRef.current) popupRef.current.close();
    }
  }));

  const popup = () => {
    if (popupRef.current) popupRef.current.showModal();
  };

  const handleClose = () => {
    if (popupRef.current) popupRef.current.close();
  };

  if (header && typeof header === "string") {
    header = (<div className="h5 p-1"> {header} </div>)
  }
  return (
    <>
      <dialog ref={popupRef} className="p-0">
        <div className="flex-v px-1">
          <div className="flex-h justify-content-between">
            {header ? header : null}
            <div className="flex-h justify-content-end py-0">
              <div className="btn p-0">
                <bsIcon.BsXCircleFill size={"1em"} onClick={handleClose}/>
              </div>
            </div>
          </div>
          {body ? <div className={className}> {body} </div> : null}
        </div>
      </dialog>
      <Button 
        className={className} title={title} type={type} 
        icon={icon} disabled={disabled} onClick={popup}/>
    </>
  );
});
