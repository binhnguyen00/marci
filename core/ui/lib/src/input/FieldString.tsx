import React, { useState, useEffect } from "react";
import { FieldProps } from "./Field";

interface FieldStringProps extends FieldProps {
}

export const FieldString = (props: FieldStringProps) => {
  const { bean, field, placeholder, className, onChange } = props;
  const [ beanState, setBeanState ] = useState(bean);

  useEffect(() => {
    setBeanState(bean);
  }, [bean]);

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rollbackValue = bean[field];
    const newValue = event.target.value;
    setBeanState({...beanState, [field]: newValue});
    if (onChange) onChange(newValue, rollbackValue);
  }

  return (
    <input 
      className={`${className} form-control`}
      type="text"
      value={beanState[field]}
      onChange={onInputChange}
      placeholder={placeholder ? placeholder : "Type something..."}/>
  );
}
