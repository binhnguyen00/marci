import React from "react";
import { widget } from "@marci-ui/lib";

function UI() {
  return (
    <div>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur facere ipsam, tempora obcaecati debitis 
      provident corporis doloribus, aperiam inventore eos, nulla quod eligendi harum necessitatibus similique ipsa. 
      Aperiam, similique consequuntur!
    </div>
  )
}

export function UIDemoPopup() { 
  const popupRef = React.useRef<HTMLDialogElement | null>(null);

  return (
    <div className="flex-v">
      <h4>Popup</h4>
      <widget.ButtonPopup className="m-1" 
        ref={popupRef} title="Click me" header={"Popup header"} body={<UI />}/>
    </div>
  )
}