import React from "react";
import { FieldProps } from "./Field";

interface FieldNumberProps extends FieldProps {}

function formatNumber(target: number, precision: number) {
  if (!target) return '0';
  var token = target.toFixed(precision).split('.');
  token[0] = token[0].replace(/\d(?=(\d{3})+$)/g, '$&,');
  return token.join('.');
}

export function FieldNumber(props: FieldNumberProps) {
  let { bean, field, placeholder, label, className, onChange, disabled, hide } = props;
  if (hide) return null;

  let [beanState, setBeanState] = React.useState(bean);

  if (!placeholder) placeholder = `Enter date...`;
  if (!label) label = field;
  if (!disabled) disabled = false;

  React.useEffect(() => {
    setBeanState(bean);
  }, [bean]);

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rollbackValue = bean[field];
    const rawValue = event.target.value;
    const newValue = parseFloat(rawValue);
    setBeanState((previousState: any) => ({
      ...previousState,
      [field]: newValue,
    }));
    if (onChange) onChange(field, newValue, rollbackValue);
  };

  return (
    <div className="flex-vbox">
      {label && <div className="text-capitalize font-weight-bold"> {label} </div>}
      <input 
        className={`form-control ${className}`}
        type="number"
        value={beanState[field]}
        defaultValue={0}
        onChange={onInputChange}
        placeholder={placeholder}
        disabled={disabled}
      />
    </div>
  );
}
