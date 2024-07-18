export interface FieldProps {
  bean: any;
  field: string;
  label?: string;
  placeholder?: string;
  disable?: boolean;
  required?: boolean;
  className?: string;
  onChange?: (newValue: any, rollbackValue: any) => void;
} 