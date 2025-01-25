import { PropsWithChildren, ReactNode } from "react";

export interface PixelArtEditorLayoutProps {
  dockMenu: ReactNode;
}

export function PixelArtEditorLayout({
  children,
  dockMenu,
}: PropsWithChildren<PixelArtEditorLayoutProps>) {
  return (
    <div className="flex flex-col sm:flex-row border-primary border-2 rounded-2xl overflow-clip">
      <div className="grow-0 shrink-0 border-b-2 sm:border-r-2 sm:border-b-0 border-primary p-4">
        {dockMenu}
      </div>
      <div className="grow shrink p-4">{children}</div>
    </div>
  );
}
