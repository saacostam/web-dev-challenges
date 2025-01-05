import { InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

export type SelectProps = InputHTMLAttributes<HTMLSelectElement> & {
  description: string;
};

export function Select(props: SelectProps) {
  return (
    <select
      {...props}
      className={twMerge(
        "select select-bordered w-full max-w-xs",
        props.className,
      )}
    >
      <option disabled selected>
        {props.description}
      </option>
      <option>Easy</option>
      <option>Medium</option>
      <option>Hard</option>
    </select>
  );
}
