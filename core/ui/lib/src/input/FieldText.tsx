import React, { useEffect, useState } from "react";
import { FieldProps } from "./Field";

interface FieldTextProps extends FieldProps {
}

export function FieldText(props: FieldTextProps) {
  let { bean, field, placeholder, label, className, onChange, disabled } = props;
  let [ beanState, setBeanState ] = useState(bean);

  useEffect(() => {
    setBeanState(bean);
  }, [bean]);

  if (!placeholder) placeholder = `Enter text...`;
  if (!label) label = field;
  if (!disabled) disabled = false;

  const onInputChange = (event: any) => {
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
      <textarea 
        className={`form-control ${className || ""}`}
        value={beanState[field]}
        onChange={onInputChange}
        placeholder={placeholder}
        disabled={disabled}/>
    </div>
  );
}