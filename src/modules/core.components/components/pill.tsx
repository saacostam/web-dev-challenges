import { PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

export interface PillProps {
  className?: string;
}

export function Pill({ className, children }: PropsWithChildren<PillProps>) {
  return (
    <div className={twMerge("badge badge-primary", className)}>{children}</div>
  );
}
