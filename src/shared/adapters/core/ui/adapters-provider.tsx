import { PropsWithChildren, useMemo } from "react";

import { Toaster } from "react-hot-toast";

import { useDownloaderAdapter } from "../../downloader/infra";
import { useJsonBlobExportAdapter } from "../../export/infra";
import { useToastNotificationsAdapter } from "../../notifications/infra";
import { useLocalStorageAdapter } from "../../storage/infra";
import { AdaptersContext } from "../app";
import { IAdapters } from "../domain";

export function AdaptersProvider({ children }: PropsWithChildren) {
  const blobExportAdapter = useJsonBlobExportAdapter();
  const downloaderAdapter = useDownloaderAdapter();
  const notificationsAdapter = useToastNotificationsAdapter();
  const storageAdapter = useLocalStorageAdapter();

  const adapters: IAdapters = useMemo(
    () => ({
      blobExportAdapter,
      downloaderAdapter,
      notificationsAdapter,
      storageAdapter,
    }),
    [
      blobExportAdapter,
      downloaderAdapter,
      notificationsAdapter,
      storageAdapter,
    ],
  );

  return (
    <>
      <AdaptersContext.Provider value={adapters}>
        {children}
      </AdaptersContext.Provider>
      <Toaster />
    </>
  );
}
