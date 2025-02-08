import { PropsWithChildren, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export interface PixelArtEditorLayoutProps {
  className?: string;
  dockFrameManagement: ReactNode;
  dockMenu: ReactNode;
}

export function PixelArtEditorLayout({
  className,
  children,
  dockFrameManagement,
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
      <div className="grow shrink p-4">
        <div className="w-full h-full flex items-center justify-center relative">
          <div className="absolute top-0 left-0 min-h-full max-h-full h-full">
            {dockFrameManagement}
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
