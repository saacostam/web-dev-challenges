import { twMerge } from "tailwind-merge";

import { LeafIcon } from "@/shared/icons";

export interface LogoProps {
  className?: string;
  iconClassName?: string;
}

export function Logo({ className, iconClassName }: LogoProps) {
  return (
    <h1
      className={twMerge(
        "font-bold inline-flex gap-4 items-center text-lg flex-wrap",
        className,
      )}
    >
      <LeafIcon className={twMerge(iconClassName, "hidden sm:block")} />
      Web Dev Challenges
    </h1>
  );
}
