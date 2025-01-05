import { PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

export interface HeaderProps {
  className?: string;
}

export function Header({
  children,
  className,
}: PropsWithChildren<HeaderProps>) {
  return (
    <h2 className={twMerge("text-3xl text-primary font-bold mb-8", className)}>
      {children}
    </h2>
  );
}
