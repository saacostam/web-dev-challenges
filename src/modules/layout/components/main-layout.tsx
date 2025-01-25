import { PropsWithChildren } from "react";
import { Navbar } from "./navbar";

export function MainLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Navbar>
        <main className="flex justify-center w-full p-8 text-base-content">
          <div className="grow max-w-5xl">{children}</div>
        </main>
      </Navbar>
    </>
  );
}
