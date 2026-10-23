import { PropsWithChildren, useMemo } from "react";

import { Toaster } from "react-hot-toast";

import { useDownloaderAdapter } from "@/shared/adapters/downloader/infra";
import { useJsonBlobExportAdapter } from "@/shared/adapters/export/infra";
import { useToastNotificationsAdapter } from "@/shared/adapters/notifications/infra";
import { useLocalStorageAdapter } from "@/shared/adapters/storage/infra";
import { AdaptersContext } from "@/shared/adapters/core/app";
import { IAdapters } from "@/shared/adapters/core/domain";

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
