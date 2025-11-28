import { PropsWithChildren, useMemo } from "react";

import { useDownloaderAdapter } from "../../downloader/infra";
import { useJsonBlobExportAdapter } from "../../export/infra";
import { useLocalStorageAdapter } from "../../storage/infra";
import { AdaptersContext } from "../app";
import { IAdapters } from "../domain";

export function AdaptersProvider({ children }: PropsWithChildren) {
  const blobExportAdapter = useJsonBlobExportAdapter();
  const downloaderAdapter = useDownloaderAdapter();
  const storageAdapter = useLocalStorageAdapter();

  const adapters: IAdapters = useMemo(
    () => ({
      blobExportAdapter,
      downloaderAdapter,
      storageAdapter,
    }),
    [blobExportAdapter, downloaderAdapter, storageAdapter],
  );

  return (
    <AdaptersContext.Provider value={adapters}>
      {children}
    </AdaptersContext.Provider>
  );
}
