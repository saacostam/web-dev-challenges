import { PropsWithChildren } from "react";

import { twMerge } from "tailwind-merge";

export interface AlertProps {
  className?: string;
}

export function Alert({ className, children }: PropsWithChildren<AlertProps>) {
  return (
    <div role="alert" className={twMerge("alert", className)}>
      <span>{children}</span>
    </div>
  );
}
