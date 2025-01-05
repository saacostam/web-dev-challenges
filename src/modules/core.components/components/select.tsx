import { InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

export type SelectProps = InputHTMLAttributes<HTMLSelectElement> & {
  description: string;
};

export function Select(props: SelectProps) {
  const { className, description, ...rest } = props;

  return (
    <select {...rest} className={twMerge("select select-bordered", className)}>
      <option disabled selected>
        {description}
      </option>
      <option>Easy</option>
      <option>Medium</option>
      <option>Hard</option>
    </select>
  );
}
