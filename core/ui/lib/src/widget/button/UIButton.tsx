import React from "react";

import { ButtonPopup } from "../popup/UIButtonPopup";
import { ButtonType } from "../Interface";

declare interface ButtonProps {
  label: string;
  type?: ButtonType;
  className?: string;
  onClick?: () => void;
  icon?: JSX.Element;
}

export function Button(props: ButtonProps) {

  let { label = "untitled", type = "primary", className = "", onClick, icon } = props;

  if (!onClick) onClick = () => {
    const errorUI = (
      <div className="h3 text-center p-1 border"> 
        {"Ops! Developers are working on it :)"} 
      </div>
    );
    alert(errorUI);
  };

  let iconUI = null;
  if (icon) iconUI = <>{icon}</>;

  return (
    <div>
      <button type="button" className={`btn btn-${type} ${className}`} onClick={onClick}> 
        {iconUI}
        {label}
      </button>
    </div>
  )
}