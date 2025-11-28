import { PropsWithChildren, useMemo } from "react";

import { useJsonBlobExportAdapter } from "../../export/infra";
import { useLocalStorageAdapter } from "../../storage/infra";
import { AdaptersContext } from "../app";
import { IAdapters } from "../domain";

export function AdaptersProvider({ children }: PropsWithChildren) {
  const blobExportAdapter = useJsonBlobExportAdapter();
  const storageAdapter = useLocalStorageAdapter();

  const adapters: IAdapters = useMemo(
    () => ({
      blobExportAdapter,
      storageAdapter,
    }),
    [blobExportAdapter, storageAdapter],
  );

  return (
    <AdaptersContext.Provider value={adapters}>
      {children}
    </AdaptersContext.Provider>
  );
}
