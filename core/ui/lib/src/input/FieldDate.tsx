import React, { useEffect, useState } from "react";
import { FieldProps } from "./Field";

interface FieldDateProps extends FieldProps {
  format?: string;
  hasTime?: boolean;
}

export const FieldDate = (props: FieldDateProps) => {
  let { bean, field, placeholder, label, className, onChange, disabled } = props;
  let [ beanState, setBeanState ] = useState(bean);

  useEffect(() => {
    setBeanState(bean);
  }, [bean]);

  if (!placeholder) placeholder = `Enter date...`;
  if (!label) label = field;
  if (!disabled) disabled = false;

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rollbackValue = bean[field];
    const newValue = event.target.value;
    setBeanState((previousState: any) => ({
      ...previousState,
      [field]: newValue,
    }));
    if (onChange) onChange(field, newValue, rollbackValue);
  }

  return (
    <div className="flex-vbox">
      <div className="text-capitalize font-weight-bold"> {label} </div>
      <input 
        className={`form-control ${className || ""}`}
        type="date"
        value={beanState[field]}
        onChange={onInputChange}
        placeholder={placeholder}
        disabled={disabled}/>
    </div>
  );
}
