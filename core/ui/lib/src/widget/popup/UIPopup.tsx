import React from "react";
import { createRoot } from "react-dom/client";
import * as icon from "react-icons/bs"; 

const POPUP_MODAL_ID = "popup-modal";

declare interface PopupProps {
  header?: React.ReactElement | string;  
  body?: React.ReactElement;
  className?: string;
}

export function Popup(props: PopupProps) {
  let { className = "", body, header } = props;
  const [ open, setOpen ] = React.useState(true);
  const popupRef = React.useRef<HTMLDialogElement | null>(null);

  React.useEffect(() => {
    if (open) {
      let popup = document.getElementById(POPUP_MODAL_ID);
      document.body.removeChild(popup!);
    } else {
      popupRef.current?.showModal();
    }
  }, [open]);

  const handleClose = () => setOpen(false);

  if (header && typeof header === "string") {
    header = (<div className="h5 p-1"> {header} </div>)
  }
  return (
    <dialog ref={popupRef} className="p-0">
      <div className="flex-v px-1">
        <div className="flex-h justify-content-between">
          {header ? header : null}
          <div className="flex-h justify-content-end btn py-0 px-0">
            <div className="btn p-0">
              <icon.BsXCircleFill size={"1em"} onClick={handleClose}/>
            </div>
          </div>
        </div>
        {body ? <div className={className}> {body} </div> : null}
      </div>
    </dialog>
  )
};

export function createPopup(header?: React.ReactElement<any> | string, body?: React.ReactElement<any>) {
  var popup = document.getElementById(POPUP_MODAL_ID);
  if (!popup) {
    popup = document.createElement("div");
    popup.setAttribute("id", POPUP_MODAL_ID);
    document.body.appendChild(popup);
  } else {
    popup.innerHTML = "";
  }

  const root = createRoot(popup);
  root.render(<Popup header={header} body={body}/>);
}

export function closePopup(): void {
  var popup = document.getElementById(POPUP_MODAL_ID);
  if (popup) {
    const root = createRoot(popup);
    root.unmount();
    document.body.removeChild(popup);
  }
}
