import React from "react";
import ReactDomClient from "react-dom/client";
import * as icon from "react-icons/bs"; 

let activePopups: string[] = []; // Array to track active popup IDs

declare interface PopupProps {
  id: string;
  header?: React.ReactElement | string;  
  body?: React.ReactElement;
  className?: string;
}

function Popup(props: PopupProps) {
  let { className = "", body, header, id } = props;
  const [ open, setOpen ] = React.useState(true);
  const popupRef = React.useRef<HTMLDialogElement | null>(null);

  React.useEffect(() => {
    if (!open) {
      closePopupById(id);
    } else {
      popupRef.current?.showModal();
    }
  }, [open, id]);

  const handleClose = () => setOpen(false);

  if (header && typeof header === "string") {
    header = (<div className="h5 p-1"> {header} </div>)
  }
  return (
    <dialog ref={popupRef} className="p-0">
      <div className="flex-v px-1">
        <div className="flex-h justify-content-between">
          {header ? header : null}
          <div className="flex-h justify-content-end py-0 px-0">
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

function createPopupId() {
  return Math.random().toString(36).substring(2, 9);
}

export function createPopup(header?: React.ReactElement<any> | string, body?: React.ReactElement<any>) {
  const POPUP_MODAL_ID = `popup-modal-${createPopupId()}`; // Generate a short unique ID for each popup
  let popup = document.getElementById(POPUP_MODAL_ID);

  if (!popup) {
    popup = document.createElement('div');
    popup.setAttribute('id', POPUP_MODAL_ID);
    document.body.appendChild(popup);
  }

  const root = ReactDomClient.createRoot(popup);
  root.render(
    <Popup id={POPUP_MODAL_ID} header={header} body={body} />
  );

  activePopups.push(POPUP_MODAL_ID); // Add the new popup ID to the active popups list
}

export function createSuccessPopup(body?: React.ReactElement<any>, title?: string) {
  if (!title) title = "Success";
  createPopup(<strong className="text-success"> {title} </strong>, body);
}

export function createDangerPopup(body?: React.ReactElement<any>, title?: string) {
  if (!title) title = "Fail";
  createPopup(<strong className="text-danger"> {title} </strong>, body);
}

export function createWarningPopup(body?: React.ReactElement<any>, title?: string) {
  if (!title) title = "Warning";
  createPopup(<strong className="text-warning"> {title} </strong>, body);
}

export function closePopupById(popupId: string) {
  const popup = document.getElementById(popupId);
  if (popup) {
    const root = ReactDomClient.createRoot(popup);
    root.unmount();
    document.body.removeChild(popup);
    activePopups = activePopups.filter((id: string) => id !== popupId); // Remove the popup ID from the active popups list
  } else {
    console.log("No Popup found");
  }
}

export function closeCurrentPopup(): void {
  if (activePopups.length > 0) {
    const currentPopupId = activePopups[activePopups.length - 1]; // Get the ID of the last popup created
    closePopupById(currentPopupId);
  } else {
    console.log("No Popup to close");
  }
}