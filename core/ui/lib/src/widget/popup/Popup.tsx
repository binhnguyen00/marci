import React from "react";
import Popup from "reactjs-popup";

interface UIPopupProps {
}

export function UIPopup(props: UIPopupProps) {
  return (
    <div className="">
      <Popup trigger={<button> Click to open popup </button>} position="right center">
          <div>GeeksforGeeks</div>
          <button>Click here</button>
      </Popup>
    </div>
  );
}