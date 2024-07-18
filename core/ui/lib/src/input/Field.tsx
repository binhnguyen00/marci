export interface FieldProps {
  bean: any;
  field: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  onChange?: (field: string, newValue: any, rollbackValue: any) => void;
} 