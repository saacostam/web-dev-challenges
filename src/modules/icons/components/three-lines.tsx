import { twMerge } from "tailwind-merge";

import { TIcon } from "../types";

export const ThreeLinesIcon: TIcon = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      className={twMerge("inline-block h-6 w-6 stroke-current", className)}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M4 6h16M4 12h16M4 18h16"
      ></path>
    </svg>
  );
};
