import { InputHTMLAttributes } from "react";

import { twMerge } from "tailwind-merge";

export type RangeProps = InputHTMLAttributes<HTMLInputElement>;

export function Range(props: RangeProps) {
  const { className, ...rest } = props;

  return (
    <input
      type="range"
      className={twMerge("range range-primary", className)}
      {...rest}
    />
  );
}
