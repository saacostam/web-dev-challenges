import { PropsWithChildren } from "react";

import { twMerge } from "tailwind-merge";

export interface SubHeaderProps {
  className?: string;
}

export function SubHeader({
  children,
  className,
}: PropsWithChildren<SubHeaderProps>) {
  return (
    <h3 className={twMerge("text-2xl text-primary font-bold mb-4", className)}>
      {children}
    </h3>
  );
}
