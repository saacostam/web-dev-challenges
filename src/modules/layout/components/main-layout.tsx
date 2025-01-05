import { PropsWithChildren } from "react";
import { Navbar } from "./navbar";

export function MainLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Navbar>
        <main className="max-w-5xl mx-auto p-8">{children}</main>
      </Navbar>
    </>
  );
}
