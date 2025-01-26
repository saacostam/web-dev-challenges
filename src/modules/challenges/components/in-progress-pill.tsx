import { twMerge } from "tailwind-merge";
import { Pill } from "../../core.components";

export interface InProgressPillProps {
  className?: string;
}

export function InProgressPill({ className }: InProgressPillProps) {
  return (
    <Pill className={twMerge("badge-info badge-outline", className)}>
      In progress
    </Pill>
  );
}
