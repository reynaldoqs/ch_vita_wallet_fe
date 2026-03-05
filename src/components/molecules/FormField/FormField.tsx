import { useId } from "react";
import type { InputHTMLAttributes } from "react";
import { Input } from "../../atoms/Input/Input";
import { Label } from "../../atoms/Label/Label";
import styles from "./FormField.module.css";

type FormFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, "id"> & {
  label: string;
  id?: string;
};

export function FormField({ label, id: idProp, className, ...inputProps }: FormFieldProps) {
  const generatedId = useId();
  const id = idProp ?? generatedId;

  return (
    <div className={`${styles.field} ${className ?? ""}`.trim()}>
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} {...inputProps} />
    </div>
  );
}
