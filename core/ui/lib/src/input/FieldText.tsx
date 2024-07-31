import React from "react";
import { FieldProps } from "./Field";

interface FieldTextProps extends FieldProps {
  height?: number | string;
}

export function FieldText(props: FieldTextProps) {
  let { bean, field, placeholder, label, className, onChange, disabled, hide, height } = props;
  if (hide) return null;

  let [ beanState, setBeanState ] = React.useState(bean);

  React.useEffect(() => {
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
        style={{ height: height }}
        className={`form-control ${className || ""}`}
        value={beanState[field]}
        onChange={onInputChange}
        placeholder={placeholder}
        disabled={disabled}/>
    </div>
  );
}