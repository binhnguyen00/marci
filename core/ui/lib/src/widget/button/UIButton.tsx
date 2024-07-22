import React from "react";
import { ButtonType } from "../Interface";

declare interface ButtonProps {
  title?: string;
  type?: ButtonType;
  className?: string;
  onClick?: () => void;
  icon?: JSX.Element;
}

export function Button(props: ButtonProps) {

  let { title: label = "untitled", type = "primary", className = "", onClick, icon } = props;

  if (!onClick) onClick = () => {
    alert("Ops! Developers are working on it :)");
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