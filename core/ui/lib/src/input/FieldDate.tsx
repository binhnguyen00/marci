import React from "react";
import { FieldProps } from "./Field";

interface FieldDateProps extends FieldProps {
  format?: string;
  hasTime?: boolean;
}

export function FieldDate(props: FieldDateProps) {
  let { 
    bean, field, placeholder = "Enter date...", label, className, onChange, 
    disabled = false, hide = false, hasTime, format 
  } = props;

  let [ beanState, setBeanState ] = React.useState(bean);

  React.useEffect(() => {
    setBeanState(bean);
  }, [bean]);

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rollbackValue = bean[field];
    const newValue = event.target.value;
    setBeanState((previousState: any) => ({
      ...previousState,
      [field]: newValue,
    }));

    // Debug
    console.log("Date", newValue);

    if (onChange) onChange(field, newValue, rollbackValue);
  }

  if (hide) return null;
  return (
    <div className="flex-v">
      {label && <div className="text-capitalize font-weight-bold"> {label} </div>}
      <input 
        className={`form-control ${className || ""}`}
        type="date"
        value={beanState[field]}
        onChange={onInputChange}
        placeholder={placeholder}
        disabled={disabled}
      />
    </div>
  );
}
