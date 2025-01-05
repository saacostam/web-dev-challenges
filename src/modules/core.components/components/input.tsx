import { InputHTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  wrapperClassName?: string;
  icon?: ReactNode;
};

export function Input(props: InputProps) {
  return (
    <label
      className={twMerge(
        "input input-bordered flex items-center gap-2",
        props.wrapperClassName,
      )}
    >
      <input {...props} />
      {props.icon}
    </label>
  );
}
