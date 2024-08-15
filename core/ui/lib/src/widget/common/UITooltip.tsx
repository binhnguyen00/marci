import React from "react";

interface TooltipProps {
  className?: string;
  tooltip?: any;
  content?: any;
  position?: "top" | "right" | "bottom" | "left";
}

export function Tooltip({ className = "", tooltip = "", content = "", position = "top"}: TooltipProps) {

  const positionMap = {
    top: "tooltip-top",
    right: "tooltip-right",
    bottom: "tooltip-bottom",
    left: "tooltip-left",
  }
  const pos = positionMap[position];

  return (
    <div className={`tooltip ${pos} ${className && className}`}> 
      {tooltip}
      <div className="tooltip-content"> {content} </div>
    </div>
  )
}