import React from "react";
import { FieldProps } from "./Field";

export interface FieldCheckBoxProps extends FieldProps {
  value?: any;
  onChecked? : (field: string, newValue: any, rollBackValue: any, isChecked: boolean) => void;
}
export function FieldCheckBox({ 
  bean, field, className, disabled = false, onChecked, hide = false, label, value }: FieldCheckBoxProps) {
  
  let [ beanState, setBeanState ] = React.useState(bean);

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rollbackValue = bean[field];
    const isChecked = event.target.checked;
    const newValue = event.target.value;
    setBeanState((previousState: any) => ({
      ...previousState,
      [field]: newValue,
    }));
    if (onChecked) onChecked(field, newValue, rollbackValue, isChecked);
  }

  if (hide) return null;
  return (
    <>
      <input 
        type="checkbox"
        className={className}
        value={value ? value : beanState[field]}
        onChange={onInputChange}
        checked={beanState[field]}
        disabled={disabled}
      />
      {label && <> {label} </>}
    </>
  )
}