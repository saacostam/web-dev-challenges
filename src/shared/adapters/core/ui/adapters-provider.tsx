import { PropsWithChildren, useMemo } from "react";

import { useLocalStorageAdapter } from "../../storage/infra";
import { AdaptersContext } from "../app";
import { IAdapters } from "../domain";

export function AdaptersProvider({ children }: PropsWithChildren) {
  const storageAdapter = useLocalStorageAdapter();

  const adapters: IAdapters = useMemo(
    () => ({
      storageAdapter,
    }),
    [storageAdapter],
  );

  return (
    <AdaptersContext.Provider value={adapters}>
      {children}
    </AdaptersContext.Provider>
  );
}
