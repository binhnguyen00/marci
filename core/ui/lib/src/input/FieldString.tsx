import React from "react";
import { FieldProps } from "./Field";

interface FieldStringProps extends FieldProps {
}

export const FieldString = (props: FieldStringProps) => {
  let { bean, field, placeholder, label, className, onChange, disabled, hide } = props;
  if (hide) return null;
  
  let [ beanState, setBeanState ] = React.useState(bean);

  React.useEffect(() => {
    setBeanState(bean);
  }, [bean]);

  if (!placeholder) placeholder = `Enter text...`;
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
      {label && <div className="text-capitalize font-weight-bold"> {label} </div>}
      <input 
        className={`form-control ${className || ""}`}
        type="text"
        value={beanState[field]}
        onChange={onInputChange}
        placeholder={placeholder}
        disabled={disabled}/>
    </div>
  );
}
