import { InputHTMLAttributes } from "react";

import { twMerge } from "tailwind-merge";

export type CheckboxProps = InputHTMLAttributes<HTMLInputElement>;

export function Checkbox(props: CheckboxProps) {
  const { className, ...rest } = props;

  return (
    <input
      type="checkbox"
      {...props}
      className={twMerge("checkbox checkbox-primary", className)}
      {...rest}
    />
  );
}
