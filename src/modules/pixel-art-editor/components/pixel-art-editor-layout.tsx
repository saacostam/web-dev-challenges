import { PropsWithChildren, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export interface PixelArtEditorLayoutProps {
  className?: string;
  dockMenu: ReactNode;
}

export function PixelArtEditorLayout({
  className,
  children,
  dockMenu,
}: PropsWithChildren<PixelArtEditorLayoutProps>) {
  return (
    <div
      className={twMerge(
        "flex flex-row border-primary border-2 rounded-2xl h-96",
        className,
      )}
    >
      <div className="grow-0 shrink-0 border-r-2 border-primary p-4">
        {dockMenu}
      </div>
      <div className="grow shrink p-4">{children}</div>
    </div>
  );
}
