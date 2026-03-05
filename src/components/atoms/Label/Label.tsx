import type { LabelHTMLAttributes } from "react";
import styles from "./Label.module.css";

type LabelProps = LabelHTMLAttributes<HTMLLabelElement> & { htmlFor?: string };

export function Label({
  children,
  className,
  htmlFor,
  ...props
}: LabelProps) {
  const classNames = `${styles.label} ${className ?? ""}`.trim();
  if (htmlFor) {
    return (
      <label htmlFor={htmlFor} className={classNames} {...props}>
        {children}
      </label>
    );
  }
  return <span className={classNames} {...props}>{children}</span>;
}
