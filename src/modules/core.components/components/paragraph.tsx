import { PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

export interface ParagraphProps {
  className?: string;
}

export function Paragraph({
  children,
  className,
}: PropsWithChildren<ParagraphProps>) {
  return <p className={twMerge("mb-4", className)}>{children}</p>;
}
