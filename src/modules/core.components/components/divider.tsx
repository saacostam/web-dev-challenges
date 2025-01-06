import { twMerge } from "tailwind-merge";

export interface DividerProps {
  className?: string;
}

export function Divider({ className }: DividerProps) {
  return <div className={twMerge("divider", className)}></div>;
}
