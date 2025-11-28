import { useCallback, useMemo } from "react";

import { IDownloaderAdapter } from "../domain";

export function useDownloaderAdapter(): IDownloaderAdapter {
  const download: IDownloaderAdapter["download"] = useCallback(
    (blob, fileName) => {
      const blobUrl = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = fileName;

      a.click();

      setTimeout(() => {
        URL.revokeObjectURL(blobUrl);
      }, 100);
    },
    [],
  );

  return useMemo(
    () => ({
      download,
    }),
    [download],
  );
}
