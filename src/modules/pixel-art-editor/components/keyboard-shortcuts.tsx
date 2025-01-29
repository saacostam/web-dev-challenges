import { PropsWithChildren } from "react";
import { useKeyboardShortcuts } from "../hooks";

export function KeyboardShortcuts({ children }: PropsWithChildren) {
  useKeyboardShortcuts();

  return <>{children}</>;
}
