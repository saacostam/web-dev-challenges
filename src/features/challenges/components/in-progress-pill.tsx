import { twMerge } from "tailwind-merge";

import { Pill } from "@/shared/components";

export interface InProgressPillProps {
  className?: string;
}

export function InProgressPill({ className }: InProgressPillProps) {
  return (
    <Pill className={twMerge("badge-accent badge-outline", className)}>
      In progress
    </Pill>
  );
}
