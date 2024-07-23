import React from "react";
import { ButtonType } from "../Interface";

declare interface ButtonProps {
  title?: string;
  type?: ButtonType;
  className?: string;
  onClick?: () => void;
  icon?: JSX.Element;
  disabled?: boolean;
}

export function Button(props: ButtonProps) {

  let { title: label = "untitled", type = "primary", className = "", onClick, icon, disabled = false } = props;

  if (!onClick) onClick = () => {
    alert("Ops! Developers are working on it :)");
  };

  let iconUI = null;
  if (icon) iconUI = <>{icon}</>;

  return (
    <div>
      <button type="button" className={`btn btn-${type} ${className}`} onClick={onClick} disabled={disabled}> 
        {iconUI}
        {label}
      </button>
    </div>
  )
}