import { twMerge } from "tailwind-merge";
import { CodeBracketIcon } from "../../icons";

export interface LogoProps {
  className?: string;
  iconClassName?: string;
}

export function Logo({ className, iconClassName }: LogoProps) {
  return (
    <h1
      className={twMerge(
        "font-bold inline-flex gap-2 items-center text-lg flex-wrap",
        className,
      )}
    >
      <CodeBracketIcon className={twMerge(iconClassName, "hidden sm:block")} />
      React Challenges
    </h1>
  );
}
