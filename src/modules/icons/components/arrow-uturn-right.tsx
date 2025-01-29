import { twMerge } from "tailwind-merge";
import { TIcon } from "../types";

export const ArrowUturnRightIcon: TIcon = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={twMerge("size-6", className)}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m15 15 6-6m0 0-6-6m6 6H9a6 6 0 0 0 0 12h3"
      />
    </svg>
  );
};
